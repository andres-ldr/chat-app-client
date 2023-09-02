import { toggleChatPanel } from '../redux/chatPanel/chatPanelSlice';
import { fetchChatWithAContact } from '../redux/chat/chatSlice';
import { selectUser } from '../redux/user/userSelector';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React from 'react';

interface IContactCard {
  contactId: string;
  alias: string;
  email: string;
  profileImage: string;
}

const ContactCard: React.FC<IContactCard> = ({
  contactId,
  alias,
  email,
  profileImage,
}) => {
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch<AppDispatch>();

  const handleChat = () => {
    const members = [{ email }, { email: user.email }];
    dispatch(fetchChatWithAContact({ alias: null, members }));
    dispatch(toggleChatPanel(true));
  };

  return (
    <div
      className={`bg-grayLight flex justify-start items-center space-x-14 w-full p-8 cursor-pointer transition hover:bg-zinc-400`}
      onClick={handleChat}
    >
      {profileImage ? (
        <img
          src={`http://localhost:8000/${profileImage}`}
          alt={`${alias}/image`}
          className='w-20 h-20 rounded-full object-cover'
        />
      ) : (
        <div className='w-14 h-14 bg-red rounded-full'></div>
      )}
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold'>{alias}</h2>
        <h3 className='text-xl font-medium'>{email}</h3>
      </div>
    </div>
  );
};

export default ContactCard;
