import { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const ContactPanel = () => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  return (
    <div className='flex flex-col gap-4 w-96 py-2'>
      <div className='flex flex-col gap-4 bg-slate-900 p-4 rounded-xl shadow'>
        <button
          onClick={() => setIsContactFormVisible(!isContactFormVisible)}
          className='bg-slate-800 text-slate-200 px-4 py-2 rounded-lg shadow'
        >
          {isContactFormVisible ? 'Close' : 'Add contact'}
        </button>
        {isContactFormVisible && <ContactForm />}
      </div>
      <ContactList />
    </div>
  );
};

export default ContactPanel;
