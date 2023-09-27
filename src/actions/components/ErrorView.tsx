import { cleanContactsError } from '../redux/contact/contactsSlice';
import { cleanChatsError } from '../redux/chats/chatsSlice';
import { cleanUserError } from '../redux/user/userSlice';
import { cleanChatError } from '../redux/chat/chatSlice';
import { selectUser } from '../redux/user/userSelector';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import React from 'react';

interface IErrorCard {
  errorMsg: string;
}

const ErrorView: React.FC<IErrorCard> = ({ errorMsg }) => {
  const { error: errorUser } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onCloseErrorCard = () => {
    dispatch(cleanUserError());
    dispatch(cleanChatsError());
    dispatch(cleanChatError());
    dispatch(cleanChatError());
    dispatch(cleanContactsError());
    if (errorUser) {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div
      className='w-screen h-screen fixed bg-grayDark bg-opacity-30 flex justify-center items-center z-50'
      onClick={onCloseErrorCard}
    >
      <div className='w-1/3 h-60 p-4 bg-slate-50 flex flex-col justify-center items-center  font-bold rounded-2xl space-y-5'>
        <h2 className='text-4xl'>Error</h2>
        <p className='text-2xl'>{errorMsg}</p>
        {errorUser && (
          <Link
            to='/login'
            className='text-2xl underline text-darkPurple transition hover:text-purple-900'
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorView;
