import { Chat } from '../types/chat';
import { User } from '../types/user';

interface ChatCardProps {
  chat: Chat;
  chatSelected: Chat;
  notifications: { [key: string]: number };
  user: User;
  handleChat: (chat: Chat) => void;
  onDeleteChat: (cid: string) => void;
  onEditChatGroup: (chat: Chat) => void;
}

const ChatCard = ({
  chat,
  chatSelected,
  notifications,
  user,
  handleChat,
  onDeleteChat,
  onEditChatGroup,
}: ChatCardProps) => {
  const getImageUrl = () => {
    if (chat.isGroup) {
      return chat.chatImage;
    }
    return chat.members.filter((member) => member.uid !== user.uid)[0]
      .profileImage;
  };

  return (
    <div
      key={chat.cid}
      className={`${
        chat.cid === chatSelected?.cid && 'bg-slate-950'
      } bg-slate-900 flex gap-2 py-2 px-4 rounded-md justify-between items-center hover:bg-slate-950 transition-colors duration-200 ease-in-out `}
    >
      <div className='flex gap-2'>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${getImageUrl()}`}
          alt={chat.alias}
          className='w-10 h-10 rounded-full object-cover'
        />
        <div>
          <p className='font-bold'>{chat.alias}</p>
          <div className='flex gap-3'>
            {user &&
              chat.isGroup &&
              chat.admins.some((admin: User) => admin.uid === user.uid) && (
                <>
                  <button
                    className='text-yellow-500 font-bold'
                    onClick={() => onEditChatGroup(chat)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-red-500 font-bold'
                    onClick={() => onDeleteChat(chat.cid)}
                  >
                    Delete
                  </button>
                </>
              )}

            <button
              className='text-blue-500 font-bold'
              onClick={() => handleChat(chat)}
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* <p>{chat.lastMessage}</p>
      <p>{chat.lastMessageDate}</p> */}

      {notifications[chat.cid] > 0 && (
        <span className='flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full'>
          {notifications[chat.cid]}
        </span>
      )}
    </div>
  );
};

export default ChatCard;
