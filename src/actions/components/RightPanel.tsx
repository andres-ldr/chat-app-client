import { RefObject, useContext, useState } from 'react';
import ChatPanel from './ChatPanel';
import ContactInfoPanel from './ContactInfoPanel';
import Cover from './Cover';
import MediaPanel from './MediaPanel';
import { popUpsContext } from '../context/popUpContext';

interface RightPanelProps {
  chatId: number | null;
}

const RightPanel: React.FC<RightPanelProps> = ({ chatId }) => {
  const { closePopUps } = useContext(popUpsContext);

  const [contactInfoPanelOpened, setContactInfoPanelOpened] = useState(false);

  const [filePanelOpened, setFilePanelOpened] = useState(false);

  const onFilePanelHandler = () => {
    setFilePanelOpened(false);
    setContactInfoPanelOpened(true);
  };

  const filePanelHandler = () => {
    setContactInfoPanelOpened(!contactInfoPanelOpened);
    setFilePanelOpened(!filePanelOpened);
  };

  const contactInfoPanelHandler = () => {
    closePopUps();
    setContactInfoPanelOpened(!contactInfoPanelOpened);
  };

  return (
    <div className='flex flex-col justify-center items-center w-9/12 h-full bg-center bg-curveLineBg bg-no-repeat bg-cover'>
      {/* Cover */}
      {!chatId && <Cover />}
      {/* Chat & contact info */}
      {chatId && (
        <div className='flex w-full h-full'>
          <ChatPanel contactInfoPanelHandler={contactInfoPanelHandler} />

          <ContactInfoPanel
            isOpen={contactInfoPanelOpened}
            contactInfoPanelHandler={contactInfoPanelHandler}
            filePanelHandler={filePanelHandler}
          />

          <MediaPanel
            isOpen={filePanelOpened}
            onFilePanelHandler={onFilePanelHandler}
          />
        </div>
      )}
    </div>
  );
};

export default RightPanel;
