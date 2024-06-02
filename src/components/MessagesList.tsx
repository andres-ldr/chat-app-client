import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Message } from '../types/message';

type Input = {
  message: string;
};

interface MessagesListProps {
  socket: any;
}

const MessagesList = ({ socket }: MessagesListProps) => {
  const { register, reset, handleSubmit } = useForm<Input>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('message', getMessages);
    // socket.on('loading', (loading: boolean) => {
    //   setIsLoading(loading);
    // });

    return () => {
      socket.off('message', getMessages);
    };
  }, [messages]);

  const onSubmit = async (data: Input) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('message')}
          type='text'
          placeholder='Message'
          className='border'
        />
        <button type='submit' className='border'>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessagesList;
