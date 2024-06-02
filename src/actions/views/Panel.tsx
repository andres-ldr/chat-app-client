import { useContactSelectedStore } from '../../store/contactSelectedStore';
import { useUserStore } from '../../store/userStore';
import { useLogOut } from '../../services/mutations';
import { useChatStore } from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';
import ChatPanel from '../../components/ChatPanel';
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import { useState } from 'react';
import MainNavbar from '../../components/MainNavbar';
import Sidebar from '../../components/Sidebar';
import ContactPanel from '../../components/ContactPanel';

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

  return (
    <div className='h-screen bg-slate-800 flex flex-col overflow-hidden'>
      <MainNavbar onLogOut={onLogOut} user={user} />

      <div className='flex-1 overflow-y-auto flex gap-2 text-slate-200'>
        <Sidebar
          setIsContactVisible={setIsContactVisible}
          setIsChatPanelVisible={setIsChatPanelVisible}
          isContactVisible={isContactVisible}
          isChatPanelVisible={isChatPanelVisible}
        />
        {isContactVisible && <ContactPanel />}
        {isChatPanelVisible && <ChatPanel />}
      </div>
    </div>
  );
};

export default Panel;
