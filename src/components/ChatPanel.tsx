import { useState } from 'react';
import ChatList from './ChatList';
import { useChatStore } from '../store/chatStore';
import GroupForm from './GroupForm';
import ChatArea from './ChatArea';

type Notification = {
  [key: string]: number;
};

const ChatPanel = () => {
  const { chat } = useChatStore();
  const [notifications, setNotification] = useState<Notification>({});
  const [isGroupFormVisible, setIsGroupFormVisible] = useState(false);

  const handleNotifaications = (chatId: string) => {
    setNotification((prev) => {
      return {
        ...prev,
        [chatId]: prev[chatId] ? prev[chatId] + 1 : 1,
      };
    });
  };

  return (
    <div className='flex gap-2 flex-1'>
      <div className='w-96 overflow-y-auto flex flex-col gap-4 shadow p-2'>
        <div className='flex flex-col p-2 gap-2 justify-between bg-slate-900 rounded-lg'>
          {/* <span className='text-xl font-semibold'>Chats</span> */}
          <button
            className='w-full bg-slate-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition duration-200'
            onClick={() => setIsGroupFormVisible(!isGroupFormVisible)}
          >
            {isGroupFormVisible ? 'Close' : 'Create Group'}
          </button>
          {isGroupFormVisible && <GroupForm />}
        </div>
        <ChatList
          notifications={notifications}
          setNotifications={setNotification}
        />
      </div>
      {chat ? <ChatArea handleNotifications={handleNotifaications} /> : null}
    </div>
  );
};

export default ChatPanel;
