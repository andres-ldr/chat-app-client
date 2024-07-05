import { useDeleteChat } from '../services/mutations';
import { useChats } from '../services/queries';
import { useChatStore } from '../store/chatStore';
import { useGroupChatSelectedStore } from '../store/groupChatSelectedStore';
import { useUserStore } from '../store/userStore';
import { Chat } from '../types/chat';
import ChatCard from './ChatCard';

interface ChatListProps {
  notifications: { [key: string]: number };
  setNotifications: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

const ChatList = ({ notifications, setNotifications }: ChatListProps) => {
  const useChatQuery = useChats();
  const { setChat, chat: chatSelected } = useChatStore();
  const deleteChatMutation = useDeleteChat();
  const { setGroupChat } = useGroupChatSelectedStore();
  const { user } = useUserStore();

  const handleChat = (chat: Chat) => {
    // const chat = useChatQuery.data?.find((chat) => chat.cid === cid);
    setChat(chat);
    setNotifications((prev) => {
      return { ...prev, [chat.cid]: 0 };
    });
  };

  const onDeleteChat = (cid: string) => {
    deleteChatMutation.mutate({ cid });
  };

  const onEditChatGroup = (chat: Chat) => {
    setGroupChat(chat);
  };

  deleteChatMutation.isSuccess && useChatQuery.refetch();

  return (
    <div className='flex flex-col gap-2 w-96'>
      {useChatQuery.isPending && <p>Loading...</p>}
      {deleteChatMutation.isPending && <p>Deleting...</p>}
      {deleteChatMutation.isError && <p>Error</p>}
      {useChatQuery.error && <p>Error</p>}

      {useChatQuery.data
        ? useChatQuery.data.map((chat: Chat) => (
            <ChatCard
              chat={chat}
              chatSelected={chatSelected!}
              notifications={notifications}
              user={user!}
              handleChat={handleChat}
              onDeleteChat={onDeleteChat}
              onEditChatGroup={onEditChatGroup}
            />
          ))
        : null}

      {useChatQuery.data?.length === 0 && <p>No chats</p>}
    </div>
  );
};

export default ChatList;
