import React, { useState, useRef, useEffect } from 'react';

type Tab = {
  id: number;
  state: boolean;
};

const Tabs = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<Window>(window);

  const [grabbing, setGrabbing] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const [listOfTabs, setListOfTabs] = useState<Tab[]>([
    { id: 0, state: true },
    { id: 1, state: false },
    { id: 2, state: false },
  ]);

  const onTabSateHandler = (id: number) => {
    const copy = listOfTabs.map((x) => x);
    copy.map((x) => {
      if (x.id === id) {
        x.state = true;
      } else {
        x.state = false;
      }
    });

    setListOfTabs(copy);
  };

  const onTabClicked = (id: number) => {
    if (wrapperRef.current) {
      const widthPerFragment =
        wrapperRef.current.scrollWidth / wrapperRef.current.children.length;

      switch (id) {
        case 0:
          wrapperRef.current.scrollLeft = 0;
          break;
        case 1:
          wrapperRef.current.scrollLeft = widthPerFragment;
          break;
        case 2:
          wrapperRef.current.scrollLeft = widthPerFragment * 2;
          break;
      }
    }
  };

  const onScrollWrapper = () => {
    if (wrapperRef.current) {
      const widthPerFragment =
        wrapperRef.current.scrollWidth / wrapperRef.current.children.length;

      if (
        0 <= wrapperRef.current.scrollLeft &&
        wrapperRef.current.scrollLeft < widthPerFragment
      ) {
        onTabSateHandler(0);
      } else if (
        widthPerFragment <= wrapperRef.current.scrollLeft &&
        wrapperRef.current.scrollLeft < 2 * widthPerFragment
      ) {
        onTabSateHandler(1);
      } else if (2 * widthPerFragment <= wrapperRef.current.scrollLeft) {
        onTabSateHandler(2);
      }
    }
  };

  windowRef.current.addEventListener('mouseup', () => {
    setPressed(false);
    setGrabbing(false);
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPressed(true);
    setStartX(e.clientX);
    setGrabbing(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!pressed) {
      return;
    }
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft += startX - e.clientX;
    }
  };

  const onMouseLeave = () => {
    setPressed(false);
  };

  return (
    <div className='w-full h-full flex flex-col'>
      {/* Header tab */}
      <div className='w-full h-20 flex bg-brightPurple'>
        <a
          onClick={() => onTabClicked(0)}
          className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
            listOfTabs[0].state
              ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
              : ''
          }`}
        >
          <h3 className='text-center text-2xl'>Images</h3>
        </a>
        <a
          onClick={() => onTabClicked(1)}
          className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
            listOfTabs[1].state
              ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
              : ''
          }`}
        >
          <h3 className='text-center text-2xl'>Images</h3>
        </a>
        <a
          onClick={() => onTabClicked(2)}
          className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
            listOfTabs[2].state
              ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
              : ''
          }`}
        >
          <h3 className='text-center text-2xl'>Images</h3>
        </a>
      </div>
      {/* Wrapper slider */}
      <div
        ref={wrapperRef}
        id='wrapper'
        onMouseDown={(e) => onMouseDown(e)}
        onMouseLeave={() => onMouseLeave()}
        onMouseMove={(e) => onMouseMove(e)}
        onScrollCapture={() => onScrollWrapper()}
        className={`w-full h-0 grow bg-grayDark flex overflow-x-auto snap-x snap-mandatory scroll-smooth ${
          grabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Fragments */}
        <div className='w-full min-w-full h-full bg-brightPurple snap-center snap-always select-none'></div>
        <div className='w-full min-w-full h-full bg-darkPurple snap-center snap-always select-none'></div>
        <div className='w-full min-w-full h-full bg-red snap-center snap-always select-none'></div>
      </div>
    </div>
  );
};

export default Tabs;
