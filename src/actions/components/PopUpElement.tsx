import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import PopUp from './PopUp';

interface IPopUpElement {
  children: React.ReactNode;
  icon: any;
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

  return (
    <div ref={popUpElementRef} className='relative  select-none'>
      <FontAwesomeIcon
        onClick={() => setIsOpen(!isOpen)}
        icon={icon}
        className='w-8 h-8 p-3 cursor-pointer transition rounded-full text-grayDark hover:bg-gray z-20'
      />
      <PopUp isShown={isOpen}>{children}</PopUp>
    </div>
  );
};

export default PopUpElement;
