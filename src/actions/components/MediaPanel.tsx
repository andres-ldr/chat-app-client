import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tabs from './Tabs';

interface MediaPanelProps {
  onFilePanelHandler: () => void;
}

const MediaPanel: React.FC<MediaPanelProps> = ({ onFilePanelHandler }) => {
  return (
    <div
      className={`w-3/5 h-full flex flex-col bg-grayLight overflow-x-auto origin-right animate-scaleWidth`}
    >
      {/* Header contact info */}
      <div className='flex w-full h-32 bg-grayReg p-5 mb-1 shadow-sm'>
        <FontAwesomeIcon
          onClick={onFilePanelHandler}
          icon={faArrowLeft}
          className='w-12 h-12 mr-5  p-1 transition rounded-full text-grayDark cursor-pointer hover:bg-gray'
        />
      </div>
      <Tabs />
    </div>
  );
};

export default MediaPanel;
