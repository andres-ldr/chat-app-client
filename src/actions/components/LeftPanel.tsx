import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            src={`http://localhost:8000/${user.profileImage}`}
            alt=''
            className='w-20 h-20 object-cover circle cursor-pointer'
          />
        ) : (
          <div></div>
        )}
        <div className='flex space-x-5'>
          <PopUpElement icon={faMessage}>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                setIsContactPanelOpen(!isContactPanelOpen);
                setIsChatsPanelOpen(false);
              }}
            >
              Contacts
            </span>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                setIsChatsPanelOpen(!isChatsPanelOpen);
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
