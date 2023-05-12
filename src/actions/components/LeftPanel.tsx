import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import PopUp from './PopUp';
import ChatCard from './ChatCard';
import { popUpsContext } from '../context/popUpContext';

interface LeftPopUpProps {
  UserImage: string;
  onSelectChatId: (id: number) => void;
}

const LeftPanel: React.FC<LeftPopUpProps> = ({ UserImage, onSelectChatId }) => {
  const { listOfPopUps, popUpHandler, closePopUps } = useContext(popUpsContext);

  return (
    <div className='relative flex flex-col h-full w-3/12 bg-darkPurple'>
      {/* User container */}
      <div className='flex justify-between w-full h-32 pl-6 pt-4 pr-4 pb-4 bg-grayLight'>
        <img
          src={UserImage}
          alt=''
          className='w-20 h-20 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
        />
        <div className='flex relative'>
          <PopUp
            isShown={listOfPopUps[0].state}
            Ref={listOfPopUps[0].popup}
            right={16}
            content={[
              {
                id: 0,
                label: 'Start new chat',
                action: () => console.log('new chat'),
              },
            ]}
          />
          <PopUp
            isShown={listOfPopUps[1].state}
            Ref={listOfPopUps[1].popup}
            content={[
              {
                id: 0,
                label: 'Log out',
                action: () => console.log('log out'),
              },
            ]}
          />

          <FontAwesomeIcon
            ref={listOfPopUps[0].icon}
            onClick={() => popUpHandler(listOfPopUps[0].id)}
            icon={faMessage}
            className='w-8 h-8 cursor-pointer p-3 mr-4 transition rounded-full text-grayDark hover:bg-gray z-20'
          />
          <FontAwesomeIcon
            ref={listOfPopUps[1].icon}
            onClick={() => popUpHandler(listOfPopUps[1].id)}
            icon={faEllipsisVertical}
            className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayDark hover:bg-gray active:bg-grayDark z-20'
          />
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
            onSelect={closePopUps}
            placeholder='Search'
            className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-12 rounded-xl outline-none placeholder-grayDark pl-16 pt-4 pr-4 pb-4 text-2xl  transition focus:shadow-input'
          />
        </div>
      </div>
      {/* Chat cards container */}
      <div className='flex flex-col grow items-center w-full h-0 pt-5 bg-grayReg overflow-y-auto'>
        {/* Card */}
        {[1, 2].map((e) => (
          <ChatCard
            key={e}
            id={e}
            onSelectChatId={onSelectChatId}
            UserImage=''
          />
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
