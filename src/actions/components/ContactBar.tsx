import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';

interface ContactBarProps {
  userImg: string;
  popHandler: (id: number) => void;
  contactInfoPanelHandler: () => void;
}

const ContactBar: React.FC<ContactBarProps> = ({ userImg, popHandler }) => {
  const fileIconRef = useRef<SVGSVGElement>(null);
  const contactSetIconRef = useRef<SVGSVGElement>(null);

  return (
    <div className='relative w-full h-32 flex justify-between bg-grayLight p-5'>
      {/* Info contact popup */}
      {/* File popup */}

      <div className='flex'>
        <img
          src={userImg}
          alt=''
          className='w-20 h-20 mr-6 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
        />
        <h3 className='text-3xl'>My friend</h3>
      </div>
      <div className='flex'>
        <FontAwesomeIcon
          ref={fileIconRef}
          icon={faPaperclip}
          onClick={() => popHandler(3)}
          className='w-10 h-10 cursor-pointer p-3 mr-3 transition rounded-full text-grayDark hover:bg-gray z-20'
        />
        <FontAwesomeIcon
          ref={contactSetIconRef}
          icon={faEllipsisVertical}
          onClick={() => popHandler(2)}
          className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayDark hover:bg-gray z-20'
        />
      </div>
    </div>
  );
};

export default ContactBar;
