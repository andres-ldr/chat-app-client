import { useForm } from 'react-hook-form';
import {
  useCreateContact,
  useUpdateContact,
  useUser,
} from '../services/mutations';
import { useContactSelectedStore } from '../store/contactSelectedStore';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { useContacts } from '../services/queries';

type Inputs = {
  alias: string;
  email: string;
};

interface ContactFormProps {
  onClose?: () => void;
}

const ContactForm = ({ onClose }: ContactFormProps) => {
  const createContactMutation = useCreateContact();
  const updateContactMutation = useUpdateContact();
  const contactsQuery = useContacts();

  const { contact, cleanContact } = useContactSelectedStore();
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      alias: '',
      email: '',
    },
  });

  const useGetUserEmailMutation = useUser();

  useEffect(() => {
    if (contact) {
      reset(contact);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  useEffect(() => {
    if (createContactMutation.isSuccess) {
      toast(createContactMutation.data.message);
      contactsQuery.refetch();
      onClose && onClose();
    }
    if (createContactMutation.error) {
      toast(createContactMutation.error.message);
    }
    if (updateContactMutation.isSuccess) {
      toast(updateContactMutation.data.message);
      contactsQuery.refetch();
      onClose && onClose();
    }
    if (updateContactMutation.error) {
      toast(updateContactMutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createContactMutation.error,
    createContactMutation.isSuccess,
    updateContactMutation.error,
    updateContactMutation.isSuccess,
  ]);

  const onSubmit = (data: Inputs) => {
    if (contact) {
      updateContactMutation.mutate({ ...contact, ...data });
      cleanContact();
    } else {
      createContactMutation.mutate(data);
    }
    reset({
      alias: '',
      email: '',
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useGetUserEmailMutation.mutate({ email: e.target.value });
  };

  const handleUserSelected = (email: string) => {
    reset({ email });
    useGetUserEmailMutation.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-2'>
          <span className='font-semibold text-slate-100'>Alias</span>
          <input
            autoComplete='off'
            className='bg-slate-900 text-white py-2 px-4 outline-none border rounded border-opacity-25'
            {...register('alias', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'This field must be at least 3 characters',
              },
            })}
            placeholder='Alias'
          />
        </label>
        <label className='flex flex-col gap-2'>
          <span className='font-semibold text-slate-100'>Email</span>
          <input
            autoComplete='off'
            className='bg-slate-900 text-white px-4 py-2 outline-none border rounded border-opacity-25'
            {...register('email', {
              required: 'This field is required',
              onChange: handleEmailChange,
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'This field must be a valid email',
              },
            })}
            placeholder='Email'
          />
          {useGetUserEmailMutation.isSuccess &&
          useGetUserEmailMutation.data.length > 0 ? (
            <div className='max-h-24 flex flex-col gap-1 overflow-y-auto shadow'>
              {useGetUserEmailMutation.data.map((user) => (
                <Card
                  key={user.uid}
                  className='bg-slate-800 flex gap-2 py-2 px-4 hover:bg-slate-900 hover:cursor-pointer transition duration-150 ease-in-out'
                  onClick={() => handleUserSelected(user.email)}
                >
                  <Avatar>
                    <AvatarImage
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        user.profileImage
                      }`}
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className='text-slate-50'>{user.email}</span>
                </Card>
              ))}
            </div>
          ) : null}

        </label>
        <button
          type='submit'
          className='bg-blue-500 py-2 px-4 font-semibold text-slate-200 rounded hover:opacity-75 transition duration-150 ease-in-out'
        >
          {contact ? 'Update' : 'Create'}
        </button>
      </form>
      {contact && (
        <button
          type='submit'
          className='bg-red-500 py-2 px-4 font-semibold text-slate-200 rounded hover:opacity-75 transition duration-150 ease-in-out'
          onClick={() => {
            reset({
              alias: '',
              email: '',
            });
            cleanContact();
            onClose && onClose();
          }}
        >
          Cancel
        </button>
      )}
    </>
  );
};

export default ContactForm;
