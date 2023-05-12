import {
  faBan,
  faChevronRight,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ContactInfoPanelProps {
  isOpen: boolean;
  contactInfoPanelHandler: () => void;
  filePanelHandler: () => void;
}

const ContactInfoPanel: React.FC<ContactInfoPanelProps> = ({
  isOpen,
  contactInfoPanelHandler,
  filePanelHandler,
}) => {
  return (
    <div
      className={`${
        isOpen ? 'w-3/5' : ' w-0'
      } h-full flex flex-col bg-grayLight overflow-x-auto origin-right transition-all`}
    >
      {/* Header contact info */}
      <div className='flex w-full h-32 bg-grayReg p-5 mb-1 shadow-sm'>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={contactInfoPanelHandler}
          className='w-12 h-12 mr-5  p-1 transition rounded-full text-grayDark cursor-pointer hover:bg-gray'
        />
        <h3 className='text-3xl font-bold'>More info</h3>
      </div>
      {/* Contact info section */}
      <div className='w-full h-0 flex flex-col grow p-3 bg-grayLight overflow-y-auto'>
        {/* Contact info card */}
        <div className='w-full mb-5 p-8 flex flex-col justify-center items-center bg-white rounded-md shadow-md animate-swipeFromTop'>
          <img
            // src={UserImage}
            src=''
            alt=''
            className='w-56 h-56 mb-3 circle bg-darkPurple cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
          />
          <h4 className='text-2xl font-bold mb-3'>Nombre</h4>
          <h5 className='text-2xl'>Email</h5>
        </div>
        {/* Media card */}
        <div
          onClick={filePanelHandler}
          className='w-full mb-5 flex flex-col justify-start items-center bg-white rounded-md shadow-md animate-swipeFromTop'
        >
          <div className='flex justify-between items-center w-full h-20 p-3 cursor-pointer transition hover:bg-grayLight'>
            <h3 className='text-2xl font-bold'>Medias, links, ...</h3>
            <FontAwesomeIcon
              icon={faChevronRight}
              className='w-12 h-12 p-2 rounded-full transition hover:bg-gray'
            />
          </div>
          <div className='w-full h-full flex bg-white pt-8 pb-8 justify-around'>
            <div className='w-52 h-52 bg-darkPurple rounded-lg'></div>
            <div className='w-52 h-52 bg-darkPurple rounded-lg'></div>
          </div>
        </div>
        {/* Contact option */}
        <div className='w-full bg-white flex flex-col rounded-lg shadow-md animate-swipeFromTop'>
          <div className='flex items-center p-2 cursor-pointer transition hover:bg-grayReg '>
            <FontAwesomeIcon
              icon={faBan}
              className='w-10 h-10 text-red p-3 mr-3 rounded-full cursor-pointer transition hover:bg-grayDark'
            />
            <h3 className='text-2xl text-red font-bold'>Block</h3>
          </div>
          <div className='flex items-center p-2 cursor-pointer transition hover:bg-grayReg '>
            <FontAwesomeIcon
              icon={faTrash}
              className='w-10 h-10 text-red p-3 mr-3 rounded-full cursor-pointer transition hover:bg-grayDark'
            />
            <h3 className='text-2xl text-red font-bold'>Delete</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPanel;
