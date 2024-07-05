import { useForm } from 'react-hook-form';
import { usePostChat, useUser } from '../services/mutations';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useChats } from '../services/queries';

type Inputs = {
  email: string;
};

interface ChatFormProps {
  onClose?: () => void;
}

const ChatForm = ({ onClose }: ChatFormProps) => {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      email: '',
    },
  });
  const useGetUserEmailMutation = useUser();
  const usePostChatMutation = usePostChat();
  const useChatsQuery = useChats();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (usePostChatMutation.isSuccess) {
      toast(usePostChatMutation.data.message);
      reset({ email: '' });
      setUserId(null);
      useChatsQuery.refetch();
      onClose && onClose();
    }
    if (usePostChatMutation.error) {
      toast(usePostChatMutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usePostChatMutation.isSuccess, usePostChatMutation.error]);

  const handleUserSelected = (email: string, uid: string) => {
    setUserId(uid);
    reset({ email });
    useGetUserEmailMutation.reset();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useGetUserEmailMutation.mutate({ email: e.target.value });
  };

  const onSubmit = () => {
    if (userId) {
      usePostChatMutation.mutate({ members: [userId] });
    }
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
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
                onClick={() => handleUserSelected(user.email, user.uid)}
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
        className='bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200'
      >
        Start Chat
      </button>
    </form>
  );
};

export default ChatForm;
