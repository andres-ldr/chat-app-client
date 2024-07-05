import { useForm } from 'react-hook-form';
import { useMessageSelectedStore } from '../store/messageStore';
import { useChatStore } from '../store/chatStore';
import { useUserStore } from '../store/userStore';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

type Input = {
  message: string;
};

interface FormMessageProps {
  socket: Socket;
}

const FormMessage = ({ socket }: FormMessageProps) => {
  const { register, reset, handleSubmit } = useForm<Input>();
  const { chat } = useChatStore();
  const { message, cleanMessage } = useMessageSelectedStore();
  const { user } = useUserStore();

  useEffect(() => {
    // if (message) {
    reset({
      message: message?.content || '',
    });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const onSubmit = (data: Input) => {
    if (!chat || !user) {
      return;
    }

    if (message) {
      socket.emit('edit-message', { ...message, content: data.message });
    } else {
      const newMessage = {
        content: data.message,
        chatId: chat.cid,
        type: 'text',
        senderId: user.uid,
      };

      socket.emit('message', newMessage);
    }

    cleanMessage();
    reset({
      message: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex gap-2 py-2 px-4 bg-slate-950'
    >
      <input
        autoComplete='off'
        {...register('message')}
        type='text'
        placeholder='Message'
        className='bg-slate-900 w-11/12 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
      />
      <button
        type='submit'
        className='rounded-full py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200 font-bold text-center'
      >
        {message ? 'Edit' : 'Send'}
      </button>
      {message && <button onClick={cleanMessage}>Discard</button>}
    </form>
  );
};

export default FormMessage;
