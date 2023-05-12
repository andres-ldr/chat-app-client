import { RefObject, useState } from 'react';
import ChatPanel from './ChatPanel';
import ContactInfoPanel from './ContactInfoPanel';
import Cover from './Cover';
import MediaPanel from './MediaPanel';

interface RightPanelProps {
  chatId: number | null;
  contactSetObj: {
    id: number;
    state: boolean;
    popup: RefObject<HTMLDivElement>;
    icon: RefObject<SVGSVGElement>;
  };
  fileObj: {
    id: number;
    state: boolean;
    popup: RefObject<HTMLDivElement>;
    icon: RefObject<SVGSVGElement>;
  };
  closePopUps: () => void;
  popUpHandler: (id: number) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  chatId,
  closePopUps,
  contactSetObj,
  fileObj,
  popUpHandler,
}) => {
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
          <ChatPanel
            contactSetObj={contactSetObj}
            fileObj={fileObj}
            contactInfoPanelHandler={contactInfoPanelHandler}
            popUpHandler={popUpHandler}
          />
          {contactInfoPanelOpened && (
            <ContactInfoPanel
              contactInfoPanelHandler={contactInfoPanelHandler}
              filePanelHandler={filePanelHandler}
            />
          )}
          {filePanelOpened && (
            <MediaPanel onFilePanelHandler={onFilePanelHandler} />
          )}
        </div>
      )}
    </div>
  );
};

export default RightPanel;
