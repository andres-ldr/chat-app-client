import { selectChatPanel } from '../../redux/chatPanel/chatPanelSelector';
import { toggleChatPanel } from '../../redux/chatPanel/chatPanelSlice';
import { fetchChatById } from '../../redux/chat/chatSlice';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React from 'react';

interface ChatCardProps {
  cid: string;
  alias: string;
  chatImage: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ cid, alias, chatImage }) => {
  const chatPanelState = useSelector(selectChatPanel);
  const dispatch = useDispatch<AppDispatch>();

  const handleChat = () => {
    dispatch(fetchChatById({ cid }));
    // no toggle sino recargar content
    dispatch(toggleChatPanel(true));
  };

  return (
    <div
      key={cid}
      onClick={handleChat}
      className='flex items-center w-11/12 h-32 bg-grayLight mb-5 p-4 rounded-2xl shadow-sm cursor-pointer transition hover:bg-gray hover:shadow-md'
    >
      {/* contact image */}
      {chatImage ? (
        <img
          src={`http://localhost:8000/${chatImage}`}
          alt=''
          className='w-20 h-20 mr-2 circle object-cover cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
        />
      ) : (
        <div className='w-20 h-20 circle'>
          <svg
            className='w-20 h-20'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0ZM6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5Z'
              fill='#474747'
            />
            <path
              d='M5 12C3.67392 12 2.40215 12.5268 1.46447 13.4645C0.526784 14.4021 0 15.6739 0 17V19C0 19.5523 0.447715 20 1 20C1.55228 20 2 19.5523 2 19V17C2 16.2043 2.31607 15.4413 2.87868 14.8787C3.44129 14.3161 4.20435 14 5 14H13C13.7956 14 14.5587 14.3161 15.1213 14.8787C15.6839 15.4413 16 16.2044 16 17V19C16 19.5523 16.4477 20 17 20C17.5523 20 18 19.5523 18 19V17C18 15.6739 17.4732 14.4021 16.5355 13.4645C15.5979 12.5268 14.3261 12 13 12H5Z'
              fill='#474747'
            />
          </svg>
        </div>
      )}

      {/* name & msg container */}
      <div className='flex flex-col justify-between w-4/6 h-full p-3'>
        <h4 className='text-2xl text-grayDark'>{alias}</h4>
        {/* <h5 className='text-xl font-light text-grayDark'></h5> */}
      </div>
      {/* date */}
      {/* <h5 className='self-start text-grayDark'></h5> */}
    </div>
  );
};

export default ChatCard;
