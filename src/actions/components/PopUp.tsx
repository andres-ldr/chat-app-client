import React from 'react';

interface PopUpProps {
  isShown: boolean;
  children: React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ isShown, children }) => {
  return (
    <div
      className={`absolute botom-0 right-0 w-96 text-2xl bg-white shadow-lg flex flex-col z-30 origin-top-right transition-all ${
        isShown ? 'scale-1' : 'scale-0'
      }`}
    >
      {children}
    </div>
  );
};

export default PopUp;
