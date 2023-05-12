import React, { useContext } from 'react';
import PopUp from './PopUp';
import MsgBubble from './MsgBubble';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { popUpsContext } from '../context/popUpContext';

interface ChatPanelProps {
  contactInfoPanelHandler: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ contactInfoPanelHandler }) => {
  const { listOfPopUps, popUpHandler } = useContext(popUpsContext);

  return (
    <div className='w-full h-full flex flex-col bg-white'>
      {/* contact bar */}
      <div className='w-full h-32 flex justify-between bg-grayLight p-5'>
        <div className='flex'>
          <img
            src=''
            alt=''
            className='w-20 h-20 mr-6 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
          />
          <h3 className='text-3xl'>My friend</h3>
        </div>
        <div className='flex relative'>
          {/* Info contact popup */}
          <PopUp
            isShown={listOfPopUps[3].state}
            Ref={listOfPopUps[3].popup}
            right={0}
            content={[
              {
                label: 'More info',
                action: () => contactInfoPanelHandler(),
              },
            ]}
          />

          {/* File popup */}
          <PopUp
            isShown={listOfPopUps[2].state}
            Ref={listOfPopUps[2].popup}
            right={16}
            content={[
              {
                label: 'Add file',
                action: () => console.log('ADD FILE'),
              },
            ]}
          />

          <FontAwesomeIcon
            ref={listOfPopUps[2].icon}
            icon={faPaperclip}
            onClick={() => {
              console.log(listOfPopUps);
              popUpHandler(2);
            }}
            className='w-10 h-10 cursor-pointer p-3 mr-3 transition rounded-full text-grayDark hover:bg-gray z-20'
          />
          <FontAwesomeIcon
            ref={listOfPopUps[3].icon}
            icon={faEllipsisVertical}
            onClick={() => popUpHandler(3)}
            className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayDark hover:bg-gray z-20'
          />
        </div>
      </div>
      {/* chat area */}
      <div className='w-full h-0 grow bg-white overflow-y-auto'>
        <MsgBubble />
        <MsgBubble isRight={true} />
      </div>
      {/* Message input */}
      <div className='w-full h-24 flex justify-start items-center pl-5 pr-5 pt-3 pb-3 bg-grayDark'>
        <FontAwesomeIcon
          icon={faPaperclip}
          className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayLight mr-3 hover:bg-gray'
        />
        <form action='' className='w-full h-full'>
          <textarea
            name=''
            id=''
            maxLength={255}
            placeholder='Write a message'
            className='w-full h-full rounded-xl outline-none placeholder-grayDark pl-6 pt-4 pr-4 pb-4 text-2xl  transition resize-none focus:shadow-input'
          />
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
