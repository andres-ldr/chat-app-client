import { Message } from '../types/message';
import moment from 'moment';

interface MessageBuubleProps {
  index: number;
  user: any;
  message: Message;
  messages: Message[];
  handleEditMessage: any;
  handleDeleteMessage: any;
}

const MessageBuuble = ({
  index,
  user,
  message: { content, senderId, sender, creationDate },
  handleDeleteMessage,
  handleEditMessage,
  messages,
}: MessageBuubleProps) => {
  const getDate = (date: Date) => {
    const time = moment(date).utc().format('HH:mm');
    return time;
  };

  return (
    <div
      key={index}
      className={`flex bg-slate-950 items-center gap-4 rounded-2xl py-2 px-4 ${
        user && senderId === user.uid ? 'self-end' : 'self-start'
      } `}
    >
      {sender && sender.uid !== user?.uid ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${sender.profileImage}`}
          alt={sender.name}
          className='w-10 h-10 rounded-full object-cover'
        />
      ) : null}
      <div className='flex flex-col'>
        <p>{content}</p>
        <div className='flex gap-4 justify-end items-center'>
          {sender && sender.uid === user?.uid && (
            <div className='flex gap-2'>
              <button
                className='text-yellow-500 font-bold'
                onClick={() => handleEditMessage(messages[index])}
              >
                Edit
              </button>
              <button
                className='text-red-500 font-bold'
                onClick={() => handleDeleteMessage(messages[index])}
              >
                Delete
              </button>
            </div>
          )}

          <p className='text-xs text-slate-400'>{getDate(creationDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBuuble;
