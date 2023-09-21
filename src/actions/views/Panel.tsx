import NewChatDialog from '../components/newChatElements/NewChatDialog';
import { selectContacts } from '../redux/contact/contactsSelector';
import { selectChats } from '../redux/chats/chatsSelector';
import { selectUser } from '../redux/user/userSelector';
import RightPanel from '../components/RightPanel';
import LeftPanel from '../components/LeftPanel';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import React, { Fragment } from 'react';
import { selectChat } from '../redux/chat/selectChat';

const Panel: React.FC = () => {
  const { isLoading } = useSelector(selectUser);
  const { isLoading: isLoadingChat } = useSelector(selectChat);
  const { isLoading: isLoadingChats } = useSelector(selectChats);
  const { isLoading: isLoadingContacts } = useSelector(selectContacts);

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      {isLoadingChats && <Spinner />}
      {isLoadingContacts && <Spinner />}
      {isLoadingChat && <Spinner />}
      {!isLoading && (
        <Fragment>
          <NewChatDialog />
          <div className='flex w-11/12 h-400 bg-white'>
            <LeftPanel />
            <RightPanel />
          </div>
        </Fragment>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Panel;
