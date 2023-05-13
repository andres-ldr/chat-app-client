import React, { useState, useRef, useContext, useEffect } from 'react';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import { popUpsContext } from '../context/popUpContext';

const Panel: React.FC = () => {
  const { listOfPopUps, setPopUps, closePopUps } = useContext(popUpsContext);

  const chatPopUpRef = useRef<HTMLDivElement>(null);
  const chatIconRef = useRef<SVGSVGElement>(null);
  const setPopUpRef = useRef<HTMLDivElement>(null);
  const setIconRef = useRef<SVGSVGElement>(null);
  const filePopUpRef = useRef<HTMLDivElement>(null);
  const fileIconRef = useRef<SVGSVGElement>(null);
  const contactSetPopUpRef = useRef<HTMLDivElement>(null);
  const contactSetIconRef = useRef<SVGSVGElement>(null);

  const iconsArr = [chatIconRef, setIconRef, contactSetIconRef, fileIconRef];

  const [chatId, setchatId] = useState<number | null>(null);

  useEffect(() => {
    setPopUps([
      { id: 0, state: false, popup: chatPopUpRef, icon: chatIconRef },
      { id: 1, state: false, popup: setPopUpRef, icon: setIconRef },
      { id: 2, state: false, popup: filePopUpRef, icon: fileIconRef },
      {
        id: 3,
        state: false,
        popup: contactSetPopUpRef,
        icon: contactSetIconRef,
      },
    ]);
  }, []);

  const onSelectChatId = (id: number) => {
    closePopUps();
    if (id) {
      setchatId(id);
    }
  };

  const closePopUpWhenClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    const item = listOfPopUps.find((e) => e.state === true);

    const iconSelected = iconsArr.some(
      (icon) =>
        icon.current === e.target || icon.current?.firstChild === e.target
    );
    if (item && target.offsetParent !== item.popup?.current && !iconSelected) {
      closePopUps();
    }
  };

  return (
    <div
      onClick={(e) => closePopUpWhenClickOutside(e)}
      className='relative flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'
    >
      <div className='flex w-11/12 h-400 bg-white'>
        <LeftPanel UserImage='' onSelectChatId={onSelectChatId} />
        <RightPanel chatId={chatId} />
      </div>
    </div>
  );
};

export default Panel;
