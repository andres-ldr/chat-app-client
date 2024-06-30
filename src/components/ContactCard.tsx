import { useEffect, useState } from 'react';
import { Contact } from '../types/contact';
import { Card } from './ui/card';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import ContactForm from './ContactForm';
import { useDeleteContact, usePostChat } from '../services/mutations';
import { useContactSelectedStore } from '../store/contactSelectedStore';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import { useContacts } from '../services/queries';

interface ContactCardProps {
  contact: Contact;
  handleChatPanel: () => void;
}

const ContactCard = ({ contact, handleChatPanel }: ContactCardProps) => {
  const useDeleteContactMutation = useDeleteContact();
  const usePostChatMutation = usePostChat();
  const { setContact } = useContactSelectedStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const useContactsQuery = useContacts();

  useEffect(() => {
    if (useDeleteContactMutation.isSuccess) {
      toast(useDeleteContactMutation.data.message);
      useContactsQuery.refetch();
    }
    if (useDeleteContactMutation.error) {
      toast(useDeleteContactMutation.error.message);
    }

    if (usePostChatMutation.isSuccess) {
      toast('Chat created successfully');
      handleChatPanel();
    }

    if (usePostChatMutation.error) {
      toast(usePostChatMutation.error.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    useDeleteContactMutation.error,
    useDeleteContactMutation.isSuccess,
    usePostChatMutation.isSuccess,
    usePostChatMutation.error,
  ]);

  const onDeleteContact = (contactId: string) => {
    useDeleteContactMutation.mutate({ contactId });
    setIsDeleteDialogOpen(false);
  };

  const onPostChat = (userId: string) => {
    const members = { members: [userId] };
    usePostChatMutation.mutate(members);
  };

  const onEditContact = (contact: Contact) => {
    setContact(contact);
  };

  return (
    <Card
      key={contact.contactId}
      className='bg-slate-900 border-none p-4 flex justify-between gap-2'
    >
      <div className='flex gap-4'>
        <Avatar>
          <AvatarImage
            src={`${import.meta.env.VITE_BACKEND_URL}${
              contact.user.profileImage
            }`}
          />
          <AvatarFallback>{contact.alias[0]}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-slate-100'>
          <span className='font-bold'>{contact.alias}</span>
          <span>{contact.email}</span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className='text-slate-100'>Options</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onPostChat(contact.user.uid)}>
            Chat
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onEditContact(contact);
              setIsEditDialogOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-500 font-semibold'
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isEditDialogOpen || isDeleteDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
        {isDeleteDialogOpen && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this file from our servers?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className='bg-red-500 hover:bg-red-700'
                onClick={() => onDeleteContact(contact.contactId)}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {isEditDialogOpen && (
          <DialogContent className='bg-slate-950'>
            <DialogHeader className='text-slate-100'>
              <DialogTitle>Edit Contact</DialogTitle>
            </DialogHeader>
            <DialogDescription>Edit Contact</DialogDescription>
            <ContactForm onClose={() => setIsEditDialogOpen(false)} />
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
};

export default ContactCard;
