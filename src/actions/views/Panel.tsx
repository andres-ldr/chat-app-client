import NewChatDialog from '../components/newChatElements/NewChatDialog';
import { selectContacts } from '../redux/contact/contactsSelector';
import { selectChats } from '../redux/chats/chatsSelector';
import { selectUser } from '../redux/user/userSelector';
import { selectChat } from '../redux/chat/selectChat';
import RightPanel from '../components/RightPanel';
import LeftPanel from '../components/LeftPanel';
import ErrorView from '../components/ErrorView';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import React, { Fragment } from 'react';

const Panel: React.FC = () => {
  const { isLoading: isLoadingUser, error: errorUser } =
    useSelector(selectUser);
  const { isLoading: isLoadingChat, error: errorChat } =
    useSelector(selectChat);
  const { isLoading: isLoadingChats, error: errorChats } =
    useSelector(selectChats);
  const { isLoading: isLoadingContacts, error: errorContacts } =
    useSelector(selectContacts);

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      {(isLoadingChats ||
        isLoadingContacts ||
        isLoadingChat ||
        isLoadingUser) && <Spinner />}
      {(errorUser || errorChat || errorChats || errorContacts) && (
        <ErrorView
          errorMsg={errorUser || errorChat || errorChats || errorContacts}
        />
      )}
      {!isLoadingUser && !errorUser && (
        <Fragment>
          <NewChatDialog />
          <div className='flex w-11/12 h-400 bg-white'>
            <LeftPanel />
            <RightPanel />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Panel;
