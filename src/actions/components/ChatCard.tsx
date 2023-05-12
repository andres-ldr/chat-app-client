import React from 'react';

interface ChatCardProps {
  key: number;
  id: number;
  UserImage: string;
  onSelectChatId: (id: number) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  key,
  id,
  onSelectChatId,
  UserImage,
}) => {
  return (
    <div
      key={key}
      onClick={() => onSelectChatId(id)}
      className='flex items-center w-11/12 h-32 bg-grayLight mb-5 p-4 rounded-2xl shadow-sm cursor-pointer transition hover:bg-gray hover:shadow-md'
    >
      {/* contact image */}
      <img
        src={UserImage}
        alt=''
        className='w-20 h-20 mr-2 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
      />
      {/* name & msg container */}
      <div className='flex flex-col justify-between w-4/6 h-full p-3'>
        <h4 className='text-2xl text-grayDark'>Friend</h4>
        <h5 className='text-xl font-light text-grayDark'>Lorem ipsum dolor</h5>
      </div>
      {/* date */}
      <h5 className='self-start text-grayDark'>yesterday</h5>
    </div>
  );
};

export default ChatCard;
