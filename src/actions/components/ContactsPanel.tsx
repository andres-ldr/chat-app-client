import { selectNewChatDialog } from '../redux/newChatDialog/newChatDialogSelector';
import { toggleNewChatDialog } from '../redux/newChatDialog/newChatDialogSlice';
import { selectContacts } from '../redux/contact/contactsSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchContacts } from '../redux/contact/contactsSlice';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { AppDispatch } from '../redux/store';
import ContactCard from './ContactCard';

interface IContact {
  contactId: string;
  alias: string;
  email: string;
  profileImage: string;
}

const ContactsPanel: React.FC = () => {
  const newChatDialogState = useSelector(selectNewChatDialog);
  const { contacts, isLoading } = useSelector(selectContacts);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <Fragment>
      <div className='flex justify-evenly items-center p-5 w-full bg-gray'>
        <h2 className='text-3xl'>Add new user</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className='w-8 h-8 p-2 circle cursor-pointer transition hover:bg-grayDark hover:text-gray'
          onClick={() => dispatch(toggleNewChatDialog(!newChatDialogState))}
        />
      </div>
      {!isLoading &&
        contacts.map((e: IContact) => (
          <ContactCard
            key={e.contactId}
            contactId={e.contactId}
            alias={e.alias}
            email={e.email}
            profileImage={e.profileImage}
          />
        ))}
    </Fragment>
  );
};

export default ContactsPanel;
