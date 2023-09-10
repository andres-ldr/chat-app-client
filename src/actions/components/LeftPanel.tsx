import { clearContactsOnLogOut } from '../redux/contact/contactsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clearChatsOnLogOut } from '../redux/chats/chatsSlice';
import { clearChatOnLogOut } from '../redux/chat/chatSlice';
import { selectUser } from '../redux/user/userSelector';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from '../redux/user/userSlice';
import React, { useState } from 'react';
import ChatsPanel from './chatsPanel/ChatsPanel';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import ContactsPanel from './ContactsPanel';
import PopUpElement from './PopUpElement';
import { toggleChatPanel } from '../redux/chatPanel/chatPanelSlice';

const LeftPanel: React.FC = () => {
  const [isContactPanelOpen, setIsContactPanelOpen] = useState<boolean>(false);
  const [isChatsPanelOpen, setIsChatsPanelOpen] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(selectUser);

  const navigate = useNavigate();

  return (
    <div className='relative flex flex-col h-full w-3/12 bg-darkPurple'>
      {/* User container */}
      <div className='flex justify-between w-full h-32 pl-6 pt-4 pr-4 pb-4 bg-grayLight'>
        {user.profileImage ? (
          <img
            //crossOrigin='anonymous'
            src={`${process.env.REACT_APP_BACKEND_URL}${user.profileImage}`}
            alt=''
            className='w-20 h-20 object-cover circle cursor-pointer'
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
        <div className='flex space-x-5'>
          <PopUpElement icon={faMessage}>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                setIsContactPanelOpen(true);
                setIsChatsPanelOpen(false);
              }}
            >
              Contacts
            </span>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                setIsChatsPanelOpen(true);
                setIsContactPanelOpen(false);
              }}
            >
              Chats
            </span>
          </PopUpElement>
          <PopUpElement icon={faEllipsisVertical}>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                dispatch(clearChatOnLogOut());
                dispatch(clearChatsOnLogOut());
                dispatch(clearContactsOnLogOut());
                dispatch(toggleChatPanel(false));
                dispatch(postLogOut());
                navigate('/login', { replace: true });
              }}
            >
              Log out
            </span>
          </PopUpElement>
        </div>
      </div>
      {/* Search input */}
      <div className='flex justify-center w-full h-20 bg-gray'>
        <div className='relative w-5/6'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`absolute top-1/2 left-10 -translate-y-1/2 -translate-x-1/2 text-grayDark z-10`}
          />
          <input
            type='text'
            name=''
            id=''
            placeholder='Search'
            className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-12 rounded-xl outline-none placeholder-grayDark pl-16 pt-4 pr-4 pb-4 text-2xl  transition focus:shadow-input'
          />
        </div>
      </div>
      {/* Chat cards container */}
      <div className='flex flex-col grow items-center w-full h-0 pt-5 bg-grayReg overflow-y-auto'>
        {/* Card */}
        {isChatsPanelOpen && <ChatsPanel />}
        {isContactPanelOpen && <ContactsPanel />}
      </div>
    </div>
  );
};

export default LeftPanel;
