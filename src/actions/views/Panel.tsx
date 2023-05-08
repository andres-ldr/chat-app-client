import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBan,
  faChevronRight,
  faEllipsisVertical,
  faMagnifyingGlass,
  faMessage,
  faPaperclip,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../assets/user.jpg';
import Tabs from '../components/Tabs';

const Panel: React.FC = () => {
  const [settingModalOpenend, setSettingModalOpenend] = useState(false);
  const [chatSettingModalOpenend, setChatSettingModalOpenend] = useState(false);
  const [contactSettingOpened, setContactSettingOpened] = useState(false);
  const [addFileModalOpened, setAddFileModalOpened] = useState(false);

  const [contactInfoPanelOpened, setContactInfoPanelOpened] = useState(false);

  const [filePanelOpened, setFilePanelOpened] = useState(false);

  const [chatId, setchatId] = useState<number | null>(null);

  const onSelectChatId = (id: number) => {
    if (id) {
      setchatId(id);
    }
  };

  const onFilePanelHandler = () => {
    setFilePanelOpened(false);
    setContactInfoPanelOpened(true);
  };

  const filePanelHandler = () => {
    setContactInfoPanelOpened(!contactInfoPanelOpened);
    setFilePanelOpened(!filePanelOpened);
  };

  const contactInfoPanelHandler = () => {
    if (contactSettingOpened && !contactInfoPanelOpened) {
      setContactSettingOpened(!contactSettingOpened);
      setContactInfoPanelOpened(!contactInfoPanelOpened);
    }
    if (!contactSettingOpened && contactInfoPanelOpened) {
      setContactInfoPanelOpened(!contactInfoPanelOpened);
    }
    if (contactSettingOpened && contactInfoPanelOpened) {
      setContactSettingOpened(!contactSettingOpened);
    }
  };

  const contactSettingPopUpHandler = () => {
    if (!addFileModalOpened) {
      setContactSettingOpened(!contactSettingOpened);
    } else {
      setContactSettingOpened(!contactSettingOpened);
      setAddFileModalOpened(!addFileModalOpened);
    }
  };

  const addFilePopUpHandler = () => {
    if (!contactSettingOpened) {
      setAddFileModalOpened(!addFileModalOpened);
    } else {
      setContactSettingOpened(!contactSettingOpened);
      setAddFileModalOpened(!addFileModalOpened);
    }
  };

  const settingPopUpHandler = () => {
    if (!chatSettingModalOpenend) {
      setSettingModalOpenend(!settingModalOpenend);
    } else {
      setSettingModalOpenend(!settingModalOpenend);
      setChatSettingModalOpenend(!chatSettingModalOpenend);
    }
  };

  const chatSettingPopUpHandler = () => {
    if (!settingModalOpenend) {
      setChatSettingModalOpenend(!chatSettingModalOpenend);
    } else {
      setChatSettingModalOpenend(!chatSettingModalOpenend);
      setSettingModalOpenend(!settingModalOpenend);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      {/* panel */}
      <div className='flex w-11/12 h-400 bg-white'>
        {/* left panel */}
        <div className='relative flex flex-col h-full w-3/12 bg-darkPurple '>
          {/* Settings pop up */}
          {settingModalOpenend && (
            <div className='absolute top-10 right-14 w-96 bg-white shadow-lg flex flex-col z-20 origin-top-right animate-scale'>
              <div className='w-full p-5 transition hover:bg-gray'>
                <h4 className='text-3xl'>Log out</h4>
              </div>
              <div className='w-full p-5 transition hover:bg-gray'>
                <h4 className='text-3xl'>Log out</h4>
              </div>
              <div className='w-full p-5 transition hover:bg-gray'>
                <h4 className='text-3xl'>Log out</h4>
              </div>
            </div>
          )}

          {chatSettingModalOpenend && (
            <div className='absolute top-10 right-32 w-96 bg-white shadow-lg flex flex-col z-20 origin-top-right animate-scale'>
              <div className='w-full p-5 transition hover:bg-gray'>
                <h4 className='text-3xl'>Start a new chat</h4>
              </div>
              <div className='w-full p-5 transition hover:bg-gray'>
                <h4 className='text-3xl'>Start a new group</h4>
              </div>
            </div>
          )}

          {/* User container */}
          <div className='flex justify-between w-full h-32 pl-6 pt-4 pr-4 pb-4 bg-grayLight'>
            <img
              src={UserImage}
              alt=''
              className='w-20 h-20 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
            />
            <div className='flex'>
              <FontAwesomeIcon
                onClick={chatSettingPopUpHandler}
                icon={faMessage}
                className='w-8 h-8 cursor-pointer p-3 mr-4 transition rounded-full text-grayDark hover:bg-gray'
              />
              <FontAwesomeIcon
                onClick={settingPopUpHandler}
                icon={faEllipsisVertical}
                className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayDark hover:bg-gray active:bg-grayDark'
              />
            </div>
          </div>
          {/* Search input */}
          <div className='flex justify-center w-full h-20 bg-gray'>
            <div className='relative w-5/6'>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`absolute top-1/2 left-10 -translate-y-1/2 -translate-x-1/2 text-grayDark z-10`}
              />
              <input
                type='text'
                name=''
                id=''
                placeholder='Search'
                className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-12 rounded-xl outline-none placeholder-grayDark pl-16 pt-4 pr-4 pb-4 text-2xl  transition focus:shadow-input'
              />
            </div>
          </div>
          {/* Chat cards container */}
          <div className='flex flex-col grow items-center w-full h-0 pt-5 bg-grayReg overflow-y-auto'>
            {/* Card */}
            <div
              onClick={() => onSelectChatId(1)}
              className='flex items-center w-11/12 h-32 bg-grayLight mb-5 p-4 rounded-2xl shadow-sm cursor-pointer transition hover:bg-gray hover:shadow-md'
            >
              {/* contact image */}
              <img
                src={UserImage}
                alt=''
                className='w-20 h-20 mr-2 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
              />
              {/* name & msg container */}
              <div className='flex flex-col justify-between w-4/6 h-full p-3'>
                <h4 className='text-2xl text-grayDark'>Friend</h4>
                <h5 className='text-xl font-light text-grayDark'>
                  Lorem ipsum dolor
                </h5>
              </div>
              {/* date */}
              <h5 className='self-start text-grayDark'>yesterday</h5>
            </div>
          </div>
        </div>
        {/* Right panel */}
        <div className='flex flex-col justify-center items-center w-9/12 h-full bg-center bg-curveLineBg bg-no-repeat bg-cover'>
          {/* Cover */}
          {!chatId && (
            <div className='w-full h-full flex flex-col justify-center items-center'>
              <svg
                className='w-200'
                viewBox='0 0 900 600'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path fill='transparent' d='M0 0h900v600H0z' />
                <path
                  d='M325.896 148.656c94.27-5.339 193.107 22.471 178.58 62.784-14.53 40.313 77.673-14.319 114.467.216 26.196 10.347 15.725 41.848 28.397 54.541 29.056 29.102 58.775-7.545 95.757 14.444C780.078 302.63 704.363 507.854 665.729 509l-440.652-2.613-31.622-2.774s-87.472-46.683-24.9-89.747c42.309-29.118 11.867-50.264 7.265-63.594-5.283-15.306-17.61-42.038 36.102-61.654 53.712-19.617 39.844-62.302 38.523-71.139-1.32-8.842-18.818-63.483 75.451-68.823z'
                  fill='url(#a)'
                />
                <path
                  d='M614.491 509.008H282.489l-99.883-248.359h331.513l100.372 248.359z'
                  fill='#4E21B7'
                />
                <path
                  d='M278.593 499.338h438.433v9.67H282.489l-3.896-9.67z'
                  fill='#4E21B7'
                />
                <path
                  d='M355.669 384.202c-4.259-14.955 4.328-27.08 19.148-27.08s30.264 12.125 34.523 27.08c4.259 14.956-4.329 27.081-19.149 27.081s-30.263-12.125-34.522-27.081z'
                  fill='#fff'
                />
                <circle
                  cx='364'
                  cy='151'
                  r='8'
                  transform='rotate(-180 364 151)'
                  fill='#7C5EC3'
                />
                <circle
                  cx='204.5'
                  cy='213.5'
                  r='5.5'
                  transform='rotate(-180 204.5 213.5)'
                  fill='#7C5EC3'
                />
                <path
                  d='M763 463.5c0 6.908-5.598 12.5-12.514 12.5-6.915 0-12.486-5.62-12.486-12.5 0-6.908 5.598-12.5 12.514-12.5 6.915 0 12.486 5.592 12.486 12.5zM173 381c0 7.737-6.494 14-14.516 14S144 388.706 144 381c0-7.737 6.494-14 14.516-14S173 373.263 173 381z'
                  stroke='#7C5EC3'
                  stroke-width='5'
                  stroke-miterlimit='10'
                />
                <rect
                  x='620.207'
                  y='419.428'
                  width='69.668'
                  height='8.117'
                  rx='4.058'
                  transform='rotate(-45 620.207 419.428)'
                  fill='#180A38'
                />
                <rect
                  x='646.919'
                  y='419.618'
                  width='25.868'
                  height='8.117'
                  rx='4.058'
                  transform='rotate(-45 646.919 419.618)'
                  fill='#180A38'
                />
                <rect
                  x='299.716'
                  y='219.275'
                  width='58.682'
                  height='6.837'
                  rx='3.418'
                  transform='rotate(-45 299.716 219.275)'
                  fill='#180A38'
                />
                <rect
                  x='322.216'
                  y='219.435'
                  width='21.789'
                  height='6.837'
                  rx='3.418'
                  transform='rotate(-45 322.216 219.435)'
                  fill='#180A38'
                />
                <rect
                  x='643.477'
                  y='206.201'
                  width='40.193'
                  height='4.683'
                  rx='2.341'
                  transform='rotate(-45 643.477 206.201)'
                  fill='#7C5EC3'
                />
                <rect
                  x='658.888'
                  y='206.311'
                  width='14.924'
                  height='4.683'
                  rx='2.341'
                  transform='rotate(-45 658.888 206.311)'
                  fill='#7C5EC3'
                />
                <rect
                  x='721.749'
                  y='338.353'
                  width='52.07'
                  height='6.066'
                  rx='3.033'
                  transform='rotate(-45 721.749 338.353)'
                  fill='#180A38'
                />
                <rect
                  x='741.713'
                  y='338.495'
                  width='19.334'
                  height='6.066'
                  rx='3.033'
                  transform='rotate(-45 741.713 338.495)'
                  fill='#180A38'
                />
                <rect
                  x='182.801'
                  y='493.917'
                  width='58.682'
                  height='6.837'
                  rx='3.418'
                  transform='rotate(-45 182.801 493.917)'
                  fill='#180A38'
                />
                <rect
                  x='205.301'
                  y='494.077'
                  width='21.789'
                  height='6.837'
                  rx='3.418'
                  transform='rotate(-45 205.301 494.077)'
                  fill='#180A38'
                />
                <path
                  d='M597.309 293.601v22.673L576.84 340.67h85.979c25.989 0 47.069-21.081 47.069-47.069 0-25.989-21.08-47.069-47.069-47.069h-18.441c-26.005 0-47.069 21.08-47.069 47.069z'
                  fill='#180A38'
                />
                <path
                  d='M633.581 293.52a8.372 8.372 0 0 1-8.368 8.368 8.371 8.371 0 0 1-8.368-8.368c0-4.618 3.749-8.367 8.368-8.367 4.618 0 8.368 3.749 8.368 8.367zm28.434 0a8.372 8.372 0 0 1-8.368 8.368 8.372 8.372 0 0 1-8.368-8.368c0-4.618 3.75-8.367 8.368-8.367s8.368 3.749 8.368 8.367zm28.434 0c0 4.619-3.749 8.368-8.367 8.368a8.371 8.371 0 0 1-8.368-8.368c0-4.618 3.749-8.367 8.368-8.367a8.37 8.37 0 0 1 8.367 8.367z'
                  fill='#fff'
                />
                <path
                  d='M159.142 235h-.277C157.23 257.864 140 258.216 140 258.216s19 .366 19 26.784c0-26.418 19-26.784 19-26.784s-17.223-.352-18.858-23.216zm387-32h-.277C544.23 225.864 527 226.216 527 226.216s19 .366 19 26.784c0-26.418 19-26.784 19-26.784s-17.223-.352-18.858-23.216zm43.44-86.683 16.398 39.979a5.349 5.349 0 0 1-2.915 6.98l-69.431 28.475a5.346 5.346 0 0 1-6.012-1.386 5.294 5.294 0 0 1-.963-1.535l-16.39-39.962a5.341 5.341 0 0 1 2.909-6.974l69.432-28.48a5.35 5.35 0 0 1 6.972 2.903z'
                  fill='#7C5EC3'
                />
                <path
                  d='m604.958 159.254-43.976-4.842-31.5 35.823a4.029 4.029 0 0 0 3.656.305l69.424-28.48 2.396-2.806zm0 0a4.038 4.038 0 0 1-2.395 2.806l2.395-2.806z'
                  fill='##7C5EC3'
                  stroke='#7C5EC3'
                  stroke-width='2.619'
                />
                <path
                  d='M511.48 148.37v-.001a4.03 4.03 0 0 1 2.195-5.263l69.431-28.481h.001a4.04 4.04 0 0 1 4.97 1.618l-26.809 42.061-49.222-8.556-.566-1.378z'
                  fill='#7C5EC3'
                  stroke='#180A38'
                  stroke-width='2.619'
                />
                <defs>
                  <linearGradient
                    id='a'
                    x1='462.442'
                    y1='711.397'
                    x2='455.822'
                    y2='-244.79'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#7C5EC3' />
                    <stop offset='1' stop-color='#7C5EC3' />
                  </linearGradient>
                </defs>
              </svg>
              <h2 className='text-grayReg text-5xl mb-10 capitalize'>
                chat app web
              </h2>
              <p className='text-grayReg text-xl w-100 text-center'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
                culpa et odio deserunt deleniti quisquam illum esse. Provident
                fugit dolorem
              </p>
            </div>
          )}
          {/* Chat & contact info */}
          {chatId && (
            <div className='flex w-full h-full'>
              {/* Chat panel */}
              <div className='w-full h-full flex flex-col bg-white'>
                {/* contact bar */}
                <div className='relative w-full h-32 flex justify-between bg-grayLight p-5'>
                  {/* Info contact popup */}
                  {contactSettingOpened && (
                    <div className='absolute top-10 right-14 w-96 bg-white shadow-lg flex flex-col z-10 origin-top-right animate-scale'>
                      <div
                        onClick={contactInfoPanelHandler}
                        className='w-full p-5 transition hover:bg-gray'
                      >
                        <h4 className='text-3xl'>More info</h4>
                      </div>
                    </div>
                  )}
                  {/* File popup */}
                  {addFileModalOpened && (
                    <div className='absolute top-12 right-36 w-96 bg-white shadow-lg flex flex-col z-10 origin-top-right animate-scale'>
                      <div className='w-full p-5 transition hover:bg-gray'>
                        <h4 className='text-3xl'>Add file</h4>
                      </div>
                      <div className='w-full p-5 transition hover:bg-gray'>
                        <h4 className='text-3xl'>Add file</h4>
                      </div>
                    </div>
                  )}

                  <div className='flex'>
                    <img
                      src={UserImage}
                      alt=''
                      className='w-20 h-20 mr-6 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
                    />
                    <h3 className='text-3xl'>My friend</h3>
                  </div>
                  <div className=''>
                    <FontAwesomeIcon
                      icon={faPaperclip}
                      onClick={addFilePopUpHandler}
                      className='w-10 h-10 cursor-pointer p-3 mr-3 transition rounded-full text-grayDark hover:bg-gray'
                    />
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      onClick={contactSettingPopUpHandler}
                      className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayDark hover:bg-gray'
                    />
                  </div>
                </div>
                {/* chat area */}
                <div className='w-full h-0 grow bg-white overflow-y-auto'>
                  {/* Chat row left */}
                  <div className='w-full p-5'>
                    {/* Msg */}
                    <div className='h-full max-w-2xl inline-flex flex-col p-4 border-2 border-gray cursor-pointer bg-white rounded-3xl text-xl'>
                      <p className='mb-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro non sunt sequi quo reiciendis, maiores, animi
                        perspiciatis ratione repellendus veritatis culpa optio
                        ad mollitia incidunt aspernatur ipsa velit, obcaecati
                        eligendi!
                      </p>
                      <span className='self-end font-light'>12:03</span>
                    </div>
                  </div>
                  {/* Chat row right */}
                  <div className='w-full flex justify-end p-5'>
                    {/* Msg */}
                    <div className='h-full max-w-2xl inline-flex flex-col p-4 border-2 border-grayReg cursor-pointer bg-grayReg rounded-3xl text-xl'>
                      <p className='mb-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro non sunt
                      </p>
                      <span className='self-end font-light'>12:03</span>
                    </div>
                  </div>
                </div>
                {/* Message input */}
                <div className='w-full h-24 flex justify-start items-center pl-5 pr-5 pt-3 pb-3 bg-grayDark'>
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayLight mr-3 hover:bg-gray'
                  />
                  <form action='' className='w-full h-full'>
                    <textarea
                      name=''
                      id=''
                      maxLength={255}
                      placeholder='Write a message'
                      className='w-full h-full rounded-xl outline-none placeholder-grayDark pl-6 pt-4 pr-4 pb-4 text-2xl  transition resize-none focus:shadow-input'
                    />
                  </form>
                </div>
              </div>
              {/* Contact info panel */}

              {contactInfoPanelOpened && (
                <div
                  className={`w-3/5 h-full flex flex-col bg-grayLight overflow-x-auto origin-right  animate-scaleWidth         
             `}
                >
                  {/* Header contact info */}
                  <div className='flex w-full h-32 bg-grayReg p-5 mb-1 shadow-sm'>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={contactInfoPanelHandler}
                      className='w-12 h-12 mr-5  p-1 transition rounded-full text-grayDark cursor-pointer hover:bg-gray'
                    />
                    <h3 className='text-3xl font-bold'>More info</h3>
                  </div>
                  {/* Contact info section */}
                  <div className='w-full h-0 flex flex-col grow p-3 bg-grayLight overflow-y-auto'>
                    {/* Contact info card */}
                    <div className='w-full mb-5 p-8 flex flex-col justify-center items-center bg-white rounded-md shadow-md animate-swipeFromTop'>
                      <img
                        // src={UserImage}
                        src=''
                        alt=''
                        className='w-56 h-56 mb-3 circle bg-darkPurple cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
                      />
                      <h4 className='text-2xl font-bold mb-3'>Nombre</h4>
                      <h5 className='text-2xl'>Email</h5>
                    </div>
                    {/* Media card */}
                    <div
                      onClick={filePanelHandler}
                      className='w-full mb-5 flex flex-col justify-start items-center bg-white rounded-md shadow-md animate-swipeFromTop'
                    >
                      <div className='flex justify-between items-center w-full h-20 p-3 cursor-pointer transition hover:bg-grayLight'>
                        <h3 className='text-2xl font-bold'>
                          Medias, links, ...
                        </h3>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className='w-12 h-12 p-2 rounded-full transition hover:bg-gray'
                        />
                      </div>
                      <div className='w-full h-full flex bg-white pt-8 pb-8 justify-around'>
                        <div className='w-52 h-52 bg-darkPurple rounded-lg'></div>
                        <div className='w-52 h-52 bg-darkPurple rounded-lg'></div>
                      </div>
                    </div>
                    {/* Contact option */}
                    <div className='w-full bg-white flex flex-col rounded-lg shadow-md animate-swipeFromTop'>
                      <div className='flex items-center p-2 cursor-pointer transition hover:bg-grayReg '>
                        <FontAwesomeIcon
                          icon={faBan}
                          className='w-10 h-10 text-red p-3 mr-3 rounded-full cursor-pointer transition hover:bg-grayDark'
                        />
                        <h3 className='text-2xl text-red font-bold'>Block</h3>
                      </div>
                      <div className='flex items-center p-2 cursor-pointer transition hover:bg-grayReg '>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='w-10 h-10 text-red p-3 mr-3 rounded-full cursor-pointer transition hover:bg-grayDark'
                        />
                        <h3 className='text-2xl text-red font-bold'>Delete</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Files & media panel */}
              {filePanelOpened && (
                <div
                  className={`w-3/5 h-full flex flex-col bg-grayLight overflow-x-auto origin-right animate-scaleWidth`}
                >
                  {/* Header contact info */}
                  <div className='flex w-full h-32 bg-grayReg p-5 mb-1 shadow-sm'>
                    <FontAwesomeIcon
                      onClick={onFilePanelHandler}
                      icon={faArrowLeft}
                      className='w-12 h-12 mr-5  p-1 transition rounded-full text-grayDark cursor-pointer hover:bg-gray'
                    />
                  </div>
                  <Tabs />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
