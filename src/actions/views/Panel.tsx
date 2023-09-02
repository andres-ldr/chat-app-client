import NewChatDialog from '../components/newChatElements/NewChatDialog';
import { selectUser } from '../redux/user/userSelector';
import RightPanel from '../components/RightPanel';
import LeftPanel from '../components/LeftPanel';
import { useSelector } from 'react-redux';
import React, { Fragment } from 'react';

const Panel: React.FC = () => {
  const { isLoading } = useSelector(selectUser);

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      {!isLoading && (
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
