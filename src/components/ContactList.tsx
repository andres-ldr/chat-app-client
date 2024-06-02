import { useDeleteContact, usePostChat } from '../services/mutations';
import { useChats, useContacts } from '../services/queries';
import { useContactSelectedStore } from '../store/contactSelectedStore';
import { Contact } from '../types/contact';

const ContactList = () => {
  const { data, isLoading, error } = useContacts();
  const useDeleteContactMutation = useDeleteContact();
  const usePostChatMutation = usePostChat();
  const useContactQuery = useContacts();
  const useChatQuery = useChats();
  const { setContact } = useContactSelectedStore();

  const onDeleteContact = (contactId: string) => {
    useDeleteContactMutation.mutate({ contactId });
  };

  const onPostChat = (userId: string) => {
    const members = { members: [userId] };
    usePostChatMutation.mutate(members);
  };

  const onEditContact = (contact: Contact) => {
    setContact(contact);
  };

  useDeleteContactMutation.isSuccess && useContactQuery.refetch();
  usePostChatMutation.isSuccess && useChatQuery.refetch();

  return (
    <div className='w-full shadow'>
      {isLoading && <p>Loading...</p>}
      {error && <p>error</p>}
      <div className='flex flex-col gap-2'>
        {data &&
          data.map((contact: Contact) => (
            <div
              key={contact.contactId}
              className='bg-slate-900 rounded-2xl p-4 flex flex-col gap-2'
            >
              <div className='flex gap-4'>
                <img
                  src={`http://localhost:8000/${contact.user.profileImage}`}
                  alt={contact.alias}
                  className='w-10 h-10 rounded-full'
                />
                <div className='flex flex-col'>
                  <span className='font-bold'>{contact.alias}</span>
                  <span>{contact.email}</span>
                </div>
              </div>
              <div className='flex gap-4 font-semibold justify-end'>
                <button
                  className='text-yellow-500 hover:opacity-75 transition duration-150 ease-in-out'
                  onClick={() => onEditContact(contact)}
                >
                  Edit
                </button>
                <button
                  className='text-red-500 hover:opacity-75 transition duration-150 ease-in-out'
                  onClick={() => onDeleteContact(contact.contactId)}
                >
                  Delete
                </button>
                <button
                  className='text-blue-500 hover:opacity-75 transition duration-150 ease-in-out'
                  onClick={() => onPostChat(contact.user.uid as string)}
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
      </div>
      {data?.length === 0 && <p>No contacts</p>}
    </div>
  );
};

export default ContactList;
