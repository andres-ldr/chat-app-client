interface SidebarProps {
  isContactVisible: boolean;
  isChatPanelVisible: boolean;
  handleContactPanel: () => void;
  handleChatPanel: () => void;
}

const Sidebar = ({
  isContactVisible,
  isChatPanelVisible,
  handleContactPanel,
  handleChatPanel,
}: SidebarProps) => {
  return (
    <div className='bg-slate-900 p-3 flex items-start flex-col w-60 overflow-y-auto shadow-lg pt-2 pl-1 gap-5'>
      <div className='w-full flex flex-col gap-1'>
        <button
          className={`${
            isContactVisible && 'bg-slate-950'
          } hover:bg-slate-950 rounded w-full text-start py-1 px-2 transition-colors duration-300 ease-in-out`}
          onClick={handleContactPanel}
        >
          Contacts
        </button>
        <button
          className={`${
            isChatPanelVisible && 'bg-slate-950'
          } hover:bg-slate-950 rounded w-full text-start py-1 px-2 transition-colors duration-300 ease-in-out`}
          onClick={handleChatPanel}
        >
          Chats
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
