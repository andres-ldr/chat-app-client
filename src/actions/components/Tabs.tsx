import {
  faChevronRight,
  faFilePdf,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, Fragment } from 'react';

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
    <Fragment>
      <div className='w-full h-full hidden flex-col'>
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
            <h3 className='text-center text-2xl'>Files</h3>
          </a>
          <a
            onClick={() => onTabClicked(2)}
            className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
              listOfTabs[2].state
                ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
                : ''
            }`}
          >
            <h3 className='text-center text-2xl'>Links</h3>
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
          {/* Fragment images */}
          <div className='w-full min-w-full h-full p-3 bg-grayLight overflow-y-auto flex flex-col snap-center snap-always select-none'>
            <div className='flex flex-col w-full p-2 mb-10'>
              <h4 className='text-3xl font-bold mb-10'>Date</h4>
              <div className='w-full h-full overflow-hidden flex flex-wrap justify-center'>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
              </div>
            </div>
            <div className='flex flex-col w-full p-2 mb-10'>
              <h4 className='text-3xl font-bold mb-10'>Date</h4>
              <div className='w-full h-full overflow-hidden flex flex-wrap justify-center'>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
              </div>
            </div>
            <div className='flex flex-col w-full p-2 mb-10'>
              <h4 className='text-3xl font-bold mb-10'>Date</h4>
              <div className='w-full h-full overflow-hidden flex flex-wrap justify-center'>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
              </div>
            </div>
          </div>
          {/* Fragment files */}
          <div className='w-full min-w-full h-full p-3 bg-grayLight overflow-y-auto snap-center snap-always select-none'>
            {/* Date & item container */}
            <div className='flex flex-col w-full p-2'>
              <h4 className='text-3xl font-bold mb-10'>Date</h4>
              <div className='w-full h-full flex flex-col justify-center'>
                {/* File item */}
                <div className='w-full h-32 p-8 mb-5 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg grow space-x-5 transition hover:shadow-lg'>
                  <FontAwesomeIcon icon={faFilePdf} className='w-16 h-16' />
                  <h3 className='text-3xl truncate grow'>my_file_name</h3>
                </div>
                {/* File item */}
                <div className='w-full h-32 p-8 mb-5 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg grow space-x-5 transition hover:shadow-lg'>
                  <FontAwesomeIcon icon={faFilePdf} className='w-16 h-16' />
                  <h3 className='text-3xl truncate grow'>my_file_name</h3>
                </div>
              </div>
            </div>
          </div>
          {/* Fragment links */}
          <div className='w-full min-w-full h-full p-3 bg-grayLight snap-center snap-always select-none'>
            {/* Date & item container */}
            <div className='flex flex-col w-full p-2'>
              <h4 className='text-3xl font-bold mb-10'>Date</h4>
              <div className='w-full h-full flex flex-col justify-center'>
                {/* link item */}
                <div className='w-full h-auto p-3 mb-10 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg space-x-5 transition hover:shadow-lg'>
                  <FontAwesomeIcon icon={faLink} className='w-12 h-12' />
                  <a
                    href='https://www.youtube.com/'
                    className='text-xl truncate grow'
                  >
                    https://www.youtube.com/
                  </a>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className='w-10 h-10 justify-self-end'
                  />
                </div>
                {/* link item */}
                <div className='w-full h-auto p-3 mb-10 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg space-x-5 transition hover:shadow-lg'>
                  <FontAwesomeIcon icon={faLink} className='w-12 h-12' />
                  <a
                    href='https://www.youtube.com/'
                    className='text-xl truncate grow'
                  >
                    https://www.youtube.com/
                  </a>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className='w-10 h-10 justify-self-end'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex flex-col'>
        {/* Header tab */}
        <div className='w-full h-20 flex bg-brightPurple'>
          <a
            onClick={() => onTabSateHandler(0)}
            className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
              listOfTabs[0].state
                ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
                : ''
            }`}
          >
            <h3 className='text-center text-2xl'>Images</h3>
          </a>
          <a
            onClick={() => onTabSateHandler(1)}
            className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
              listOfTabs[1].state
                ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
                : ''
            }`}
          >
            <h3 className='text-center text-2xl'>Files</h3>
          </a>
          <a
            onClick={() => onTabSateHandler(2)}
            className={`h-full grow p-3 cursor-pointer transition bg-white  hover:bg-grayReg ${
              listOfTabs[2].state
                ? 'border-b-2 bg-darkPurple text-brightPurple font-bold'
                : ''
            }`}
          >
            <h3 className='text-center text-2xl'>Links</h3>
          </a>
        </div>
        {/* Wrapper slider */}
        <div
          ref={wrapperRef}
          id='wrapper'
          className={`w-full h-0 grow bg-grayDark flex overflow-x-auto`}
        >
          {listOfTabs[0].state && (
            <div
              className={`w-full min-w-full h-full p-3 bg-grayLight overflow-y-auto flex flex-col snap-center snap-always select-none animate-swipeFromTop`}
            >
              <div className='flex flex-col w-full p-2 mb-10'>
                <h4 className='text-3xl font-bold mb-10'>Date</h4>
                <div className='w-full h-full overflow-hidden flex flex-wrap justify-center'>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                </div>
              </div>
              <div className='flex flex-col w-full p-2 mb-10'>
                <h4 className='text-3xl font-bold mb-10'>Date</h4>
                <div className='w-full h-full overflow-hidden flex flex-wrap justify-center'>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                </div>
              </div>
              <div className='flex flex-col w-full p-2 mb-10'>
                <h4 className='text-3xl font-bold mb-10'>Date</h4>
                <div className='w-full h-full overflow-hidden flex flex-wrap justify-center'>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                  <div className='w-60 h-60 m-1 bg-lightPurple grow'></div>
                </div>
              </div>
            </div>
          )}
          {listOfTabs[1].state && (
            <div className='w-full min-w-full h-full p-3 bg-grayLight overflow-y-auto snap-center snap-always select-none animate-swipeFromTop'>
              {/* Date & item container */}
              <div className='flex flex-col w-full p-2'>
                <h4 className='text-3xl font-bold mb-10'>Date</h4>
                <div className='w-full h-full flex flex-col justify-center'>
                  {/* File item */}
                  <div className='w-full h-32 p-8 mb-5 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg grow space-x-5 transition hover:shadow-lg'>
                    <FontAwesomeIcon icon={faFilePdf} className='w-16 h-16' />
                    <h3 className='text-3xl truncate grow'>my_file_name</h3>
                  </div>
                  {/* File item */}
                  <div className='w-full h-32 p-8 mb-5 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg grow space-x-5 transition hover:shadow-lg'>
                    <FontAwesomeIcon icon={faFilePdf} className='w-16 h-16' />
                    <h3 className='text-3xl truncate grow'>my_file_name</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          {listOfTabs[2].state && (
            <div className='w-full min-w-full h-full p-3 bg-grayLight snap-center snap-always select-none animate-swipeFromTop'>
              {/* Date & item container */}
              <div className='flex flex-col w-full p-2'>
                <h4 className='text-3xl font-bold mb-10'>Date</h4>
                <div className='w-full h-full flex flex-col justify-center'>
                  {/* link item */}
                  <div className='w-full h-auto p-3 mb-10 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg space-x-5 transition hover:shadow-lg'>
                    <FontAwesomeIcon icon={faLink} className='w-12 h-12' />
                    <a
                      href='https://www.youtube.com/'
                      className='text-xl truncate grow'
                    >
                      https://www.youtube.com/
                    </a>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className='w-10 h-10 justify-self-end'
                    />
                  </div>
                  {/* link item */}
                  <div className='w-full h-auto p-3 mb-10 rounded-2xl shadow-md cursor-pointer flex justify-start items-center bg-grayReg space-x-5 transition hover:shadow-lg'>
                    <FontAwesomeIcon icon={faLink} className='w-12 h-12' />
                    <a
                      href='https://www.youtube.com/'
                      className='text-xl truncate grow'
                    >
                      https://www.youtube.com/
                    </a>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className='w-10 h-10 justify-self-end'
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Tabs;
