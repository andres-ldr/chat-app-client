import { selectChatPanel } from '../redux/chatPanel/chatPanelSelector';
import { selectChat } from '../redux/chat/selectChat';
// import ContactInfoPanel from './ContactInfoPanel';
import { useSelector } from 'react-redux';
// import MediaPanel from './MediaPanel';
import ChatPanel from './ChatPanel';
import Cover from './Cover';

const RightPanel: React.FC = () => {
  // const [contactInfoPanelOpened, setContactInfoPanelOpened] = useState(false);
  // const [filePanelOpened, setFilePanelOpened] = useState(false);
  const chatPanelState = useSelector(selectChatPanel);
  const { cid } = useSelector(selectChat);

  // const onFilePanelHandler = () => {
  //   setFilePanelOpened(false);
  //   setContactInfoPanelOpened(true);
  // };

  // const filePanelHandler = () => {
  //   setContactInfoPanelOpened(!contactInfoPanelOpened);
  //   setFilePanelOpened(!filePanelOpened);
  // };

  // const contactInfoPanelHandler = () => {
  //   setContactInfoPanelOpened(!contactInfoPanelOpened);
  // };

  return (
    <div className='flex flex-col justify-center items-center w-9/12 h-full bg-center bg-curveLineBg bg-no-repeat bg-cover'>
      {/* Cover */}
      {!chatPanelState.active && <Cover />}
      {/* Chat & contact info */}
      {chatPanelState.active && (
        <div className='flex w-full h-full'>
          {cid && <ChatPanel />}

          {/* <ContactInfoPanel
            isOpen={contactInfoPanelOpened}
            contactInfoPanelHandler={contactInfoPanelHandler}
            filePanelHandler={filePanelHandler}
          /> */}

          {/* <MediaPanel
            isOpen={filePanelOpened}
            onFilePanelHandler={onFilePanelHandler}
          /> */}
        </div>
      )}
    </div>
  );
};

export default RightPanel;
