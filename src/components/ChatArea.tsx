import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChatStore } from '../store/chatStore';
import { useMessageSelectedStore } from '../store/messageStore';
import { useUserStore } from '../store/userStore';
import { Message } from '../types/message';
import FormMessage from './FormMessage';
import MessageBuuble from './MessageBuuble';
import { io } from 'socket.io-client';
import moment from 'moment';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

interface ChatAreaProps {
  handleNotifications: (chatId: string) => void;
}

type Input = {
  message: string;
};

const ChatArea = ({ handleNotifications }: ChatAreaProps) => {
  const { register, reset, handleSubmit } = useForm<Input>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { chat, deleteChat } = useChatStore();
  const { user } = useUserStore();
  const { setMessage, message, cleanMessage } = useMessageSelectedStore();

  useEffect(() => {
    const getMessages = (message: Message) => {
      if (chat && chat.cid !== message.chatId) {
        handleNotifications(message.chatId);
      } else {
        setMessages((prev) => [...prev, message]);
      }
    };

    const editMessages = (message: Message) => {
      setMessages((prev) => {
        const index = prev.findIndex((m) => m.mid === message.mid);
        prev[index] = message;
        return [...prev];
      });
    };

    const deleteMessages = (message: Message) => {
      setMessages((prev) => {
        return prev.filter((m) => m.mid !== message.mid);
      });
    };

    socket.on('message', getMessages);
    socket.on('edit-message', editMessages);
    socket.on('delete-message', deleteMessages);

    return () => {
      socket.off('message', getMessages);
      socket.off('edit-message', editMessages);
    };
  }, [chat, handleNotifications, messages]);

  useEffect(() => {
    if (chat) {
      socket.emit('join', { cid: chat.cid });

      socket.on('messages', (messages: Message[]) => {
        setMessages(messages);
      });
    }
  }, [chat]);

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

  const handleEditMessage = (message: Message) => {
    setMessage(message);
    reset({ message: message.content });
  };

  const handleDeleteMessage = (message: Message) => {
    socket.emit('delete-message', message);
  };

  const groupedMessages = messages.reduce((groups, message) => {
    const date = moment(message.creationDate).format('MMMM D YYYY');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className='flex flex-col shadow flex-1'>
      <div className='flex gap-4 justify-between bg-slate-900 p-4'>
        <div className='flex gap-2 items-center'>
          <img
            src={`http://localhost:8000/${chat?.chatImage}`}
            alt={chat?.alias}
            className='w-10 h-10 rounded-full object-cover'
          />
          <span className='text-xl font-semibold'>{chat?.alias}</span>
        </div>
        <button
          type='button'
          className='text-red-500'
          onClick={() => deleteChat()}
        >
          Close
        </button>
      </div>
      <div className='flex-1 flex flex-col gap-2 overflow-y-auto p-2 bg-slate-800'>
        {Object.keys(groupedMessages).length > 0 ? (
          Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className='flex flex-col gap-2'>
              <h2 className='text-slate-400 text-center text-sm font-bold'>
                {date}
              </h2>
              {messages.map((message: Message, index: number) => (
                <MessageBuuble
                  index={index}
                  user={user}
                  message={message}
                  messages={messages}
                  handleEditMessage={handleEditMessage}
                  handleDeleteMessage={handleDeleteMessage}
                />
              ))}
            </div>
          ))
        ) : (
          <div className='flex h-full items-center justify-center'>
            <p>No messages</p>
          </div>
        )}
      </div>
      <FormMessage
        handleSubmit={handleSubmit}
        message={message}
        onSubmit={onSubmit}
        register={register}
      />
    </div>
  );
};

export default ChatArea;
