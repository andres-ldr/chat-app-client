import { useEffect, useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { useUserStore } from '../store/userStore';
import { Message } from '../types/message';
import FormMessage from './FormMessage';
import MessageBuuble from './MessageBuuble';
import { io } from 'socket.io-client';
import moment from 'moment';
import { Avatar, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

interface ChatAreaProps {
  handleNotifications: (chatId: string) => void;
}

const ChatArea = ({ handleNotifications }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chat, deleteChat } = useChatStore();
  const { user } = useUserStore();

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
      toast('Message edited');
    };

    const deleteMessages = (message: Message) => {
      setMessages((prev) => {
        return prev.filter((m) => m.mid !== message.mid);
      });
      toast('Message deleted');
    };

    socket.on('message', getMessages);
    socket.on('edit-message', editMessages);
    socket.on('delete-message', deleteMessages);

    return () => {
      socket.off('message', getMessages);
      socket.off('edit-message', editMessages);
      socket.off('delete-message', deleteMessages);
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

  const groupedMessages = messages.reduce((groups, message) => {
    const date = moment(message.creationDate).format('MMMM D YYYY');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  const getImageUrl = () => {
    if (chat?.isGroup) {
      return chat.chatImage;
    }
    return chat?.members.filter((member) => member.uid !== user?.uid)[0]
      .profileImage;
  };

  return (
    <div className='flex flex-col shadow flex-1'>
      <div className='flex gap-4 justify-between bg-slate-900 p-4'>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarImage
              src={`${import.meta.env.VITE_BACKEND_URL}${getImageUrl()}`}
              alt={chat?.alias}
            />
            {/* <AvatarFallback>{}</AvatarFallback> */}
          </Avatar>
          <span className='text-xl text-slate-100 font-semibold'>
            {chat?.alias}
          </span>
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
                  socket={socket}
                  index={index}
                  user={user}
                  message={message}
                  messages={messages}
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
      <FormMessage socket={socket} />
    </div>
  );
};

export default ChatArea;
