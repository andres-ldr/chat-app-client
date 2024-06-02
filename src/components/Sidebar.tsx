import React from 'react';

interface SidebarProps {
  isContactVisible: boolean;
  isChatPanelVisible: boolean;
  setIsContactVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChatPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  isContactVisible,
  isChatPanelVisible,
  setIsChatPanelVisible,
  setIsContactVisible,
}: SidebarProps) => {
  return (
    <div className='bg-slate-900 p-3 flex items-start flex-col w-60 overflow-y-auto shadow-lg pt-2 pl-1 gap-5'>
      <span className='font-semibold text-xl'>Dashboard</span>
      <div className='w-full flex flex-col gap-1'>
        <button
          className={`${
            isContactVisible && 'bg-slate-950'
          } hover:bg-slate-950 rounded w-full text-start py-1 px-2 transition-colors duration-300 ease-in-out`}
          onClick={() => {
            setIsContactVisible(true);
            setIsChatPanelVisible(false);
          }}
        >
          Contacts
        </button>
        <button
          className={`${
            isChatPanelVisible && 'bg-slate-950'
          } hover:bg-slate-950 rounded w-full text-start py-1 px-2 transition-colors duration-300 ease-in-out`}
          onClick={() => {
            setIsContactVisible(false);
            setIsChatPanelVisible(true);
          }}
        >
          Chats
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
