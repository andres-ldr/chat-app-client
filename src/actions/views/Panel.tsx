import { useContactSelectedStore } from '../../store/contactSelectedStore';
import { useUserStore } from '../../store/userStore';
import { useLogOut } from '../../services/mutations';
import { useChatStore } from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';
import ChatPanel from '../../components/ChatPanel';
import { useState } from 'react';
import MainNavbar from '../../components/MainNavbar';
import Sidebar from '../../components/Sidebar';
import ContactList from '../../components/ContactList';

const Panel = () => {
  const { user, deleteUser } = useUserStore();
  const { deleteChat } = useChatStore();
  const { cleanContact } = useContactSelectedStore();
  const logOutMutation = useLogOut();
  const navigate = useNavigate();
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isChatPanelVisible, setIsChatPanelVisible] = useState(true);

  const onLogOut = () => {
    deleteUser();
    deleteChat();
    cleanContact();
    logOutMutation.mutate();
    navigate('/', { replace: true });
  };

  const handleContactPanel = () => {
    setIsContactVisible(true);
    setIsChatPanelVisible(false);
  };

  const handleChatPanel = () => {
    setIsContactVisible(false);
    setIsChatPanelVisible(true);
  };

  return (
    <div className='h-screen bg-slate-800 flex flex-col overflow-hidden'>
      <MainNavbar onLogOut={onLogOut} user={user} />

      <div className='flex-1 overflow-y-auto flex gap-2 text-slate-200'>
        <Sidebar
          handleChatPanel={handleChatPanel}
          handleContactPanel={handleContactPanel}
          isContactVisible={isContactVisible}
          isChatPanelVisible={isChatPanelVisible}
        />
        {isContactVisible && <ContactList handleChatPanel={handleChatPanel} />}
        {isChatPanelVisible && <ChatPanel />}
      </div>
    </div>
  );
};

export default Panel;
