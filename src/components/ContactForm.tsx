import { useForm } from 'react-hook-form';
import {
  useCreateContact,
  useUpdateContact,
  useUser,
} from '../services/mutations';
import { useContacts } from '../services/queries';
import { useContactSelectedStore } from '../store/contactSelectedStore';
import { useEffect } from 'react';

type Inputs = {
  alias: string;
  email: string;
};

const ContactForm = () => {
  const { contact, cleanContact } = useContactSelectedStore();
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      alias: '',
      email: '',
    },
  });
  const createContactMutation = useCreateContact();
  const updateContactMutation = useUpdateContact();
  const useContactQuery = useContacts();
  const useGetUserEmailMutation = useUser();

  useEffect(() => {
    if (contact) {
      reset(contact);
    }
    reset();
  }, [contact, reset]);

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

  createContactMutation.isSuccess && useContactQuery.refetch();
  updateContactMutation.isSuccess && useContactQuery.refetch();

  return (
    <>
      <span className='font-semibold text-xl text-center'>
        Add a new contact
      </span>
      {createContactMutation.isPending ||
        (updateContactMutation.isPending && <p>Loading...</p>)}
      {createContactMutation.error ||
        (updateContactMutation.isError && <p>Error</p>)}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-2'>
          <span className='font-semibold'>Alias</span>
          <input
            className='bg-slate-900 py-2 px-4 outline-none border rounded border-opacity-25'
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
          <span className='font-semibold'>Email</span>
          <input
            className='bg-slate-900 px-4 py-2 outline-none border rounded border-opacity-25'
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
            <div className='max-h-24  overflow-y-auto shadow'>
              {useGetUserEmailMutation.data.map((user) => (
                <div
                  key={user.uid}
                  className='flex gap-2  py-2 px-4 hover:bg-slate-950 hover:cursor-pointer transition duration-150 ease-in-out'
                  onClick={() => handleUserSelected(user.email)}
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${user.profileImage}`}
                    alt=''
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <span>{user.email}</span>
                </div>
              ))}
            </div>
          ) : null}

          {/* {useGetUserEmailMutation.isError && (
              <span>{useGetUserEmailMutation.error.message}</span>
            )} */}
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
          }}
        >
          Cancel
        </button>
      )}
    </>
  );
};

export default ContactForm;
