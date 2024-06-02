import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useRef, useState } from 'react';
import PopUp from './PopUp';

interface IPopUpElement {
  children: React.ReactNode;
  icon: IconProp;
}

const PopUpElement: React.FC<IPopUpElement> = ({ children, icon }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popUpElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (popUpElementRef.current) {
        if (!popUpElementRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleState = () => setIsOpen(!isOpen);

  return (
    <div ref={popUpElementRef} className='relative  select-none'>
      <FontAwesomeIcon
        onClick={handleState}
        icon={icon}
        className='w-5 h-5 p-3 cursor-pointer transition rounded-full text-grayDark hover:bg-gray z-20'
      />
      <PopUp isShown={isOpen} handleState={handleState}>
        {children}
      </PopUp>
    </div>
  );
};

export default PopUpElement;
