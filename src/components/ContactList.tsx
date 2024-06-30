import { useContacts } from '../services/queries';
import { Contact } from '../types/contact';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';

interface ContactListProps {
  handleChatPanel: () => void;
}

const ContactList = ({ handleChatPanel }: ContactListProps) => {
  const useContactQuery = useContacts();
  const [isCreateContactDialogOpen, setIsCreateContactDialogOpen] =
    useState(false);

  return (
    <div className='flex flex-col gap-4 w-96 py-2'>
      <div className='flex flex-col gap-2'>
        <Button
          className='bg-blue-600 hover:bg-blue-800'
          onClick={() => setIsCreateContactDialogOpen(true)}
        >
          Create New Contact
        </Button>

        <Dialog
          open={isCreateContactDialogOpen}
          onOpenChange={setIsCreateContactDialogOpen}
        >
          <DialogContent className='sm:max-w-[425px] bg-slate-950'>
            <DialogHeader className='text-slate-100'>
              <DialogTitle>Create A New Contact</DialogTitle>
            </DialogHeader>
            <DialogDescription>Create a new contact</DialogDescription>
            <ContactForm onClose={() => setIsCreateContactDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        {useContactQuery.data &&
          useContactQuery.data.map((contact: Contact) => (
            <ContactCard contact={contact} handleChatPanel={handleChatPanel} />
          ))}
      </div>
      {useContactQuery.data?.length === 0 && <p>No contacts</p>}
    </div>
  );
};

export default ContactList;
