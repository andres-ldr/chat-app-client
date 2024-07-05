import { useState } from 'react';
import ChatList from './ChatList';
import { useChatStore } from '../store/chatStore';
import GroupForm from './GroupForm';
import ChatArea from './ChatArea';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import ChatForm from './ChatForm';

type Notification = {
  [key: string]: number;
};

const ChatPanel = () => {
  const { chat } = useChatStore();
  const [notifications, setNotification] = useState<Notification>({});
  const [isGroupFormDialogVisible, setIsGroupFormDialogVisible] =
    useState(false);
  const [isChatFormDialogVisible, setisChatFormDialogVisible] = useState(false);

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
      <div className='w-96 overflow-y-auto flex flex-col gap-4 pt-2'>
        <Button
          className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200'
          onClick={() => setIsGroupFormDialogVisible(true)}
        >
          Create new Group Chat
        </Button>
        <Button
          className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200'
          onClick={() => setisChatFormDialogVisible(true)}
        >
          Create new Chat
        </Button>

        <ChatList
          notifications={notifications}
          setNotifications={setNotification}
        />
      </div>
      {chat ? <ChatArea handleNotifications={handleNotifaications} /> : null}

      <Dialog
        open={isGroupFormDialogVisible || isChatFormDialogVisible}
        onOpenChange={
          isGroupFormDialogVisible
            ? setIsGroupFormDialogVisible
            : setisChatFormDialogVisible
        }
      >
        {isGroupFormDialogVisible && (
          <DialogContent className='sm:max-w-[425px] max-h-[70%] overflow-y-auto bg-slate-950'>
            <DialogHeader className='text-slate-100'>
              <DialogTitle>Create A New Group Chat</DialogTitle>
            </DialogHeader>
            <DialogDescription>Create a new Group Chat</DialogDescription>
            <GroupForm />
          </DialogContent>
        )}
        {isChatFormDialogVisible && (
          <DialogContent className='sm:max-w-[425px] max-h-[70%] overflow-y-auto bg-slate-950'>
            <DialogHeader className='text-slate-100'>
              <DialogTitle>Create A New Chat</DialogTitle>
            </DialogHeader>
            <DialogDescription>Create a new Chat</DialogDescription>
            <ChatForm onClose={() => setisChatFormDialogVisible(false)} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ChatPanel;
