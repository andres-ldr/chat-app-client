import React, { Fragment } from 'react';

interface PopUpProps {
  Ref: React.RefObject<HTMLDivElement>;
  right?: number;
  content: {
    label: string;
    action: () => void;
  }[];
}

const PopUp: React.FC<PopUpProps> = ({ Ref, right, content }) => {
  const choosePopUp = (r?: number) => {
    switch (r) {
      case 10:
        return (
          <div
            ref={Ref}
            className={`absolute top-16 right-10 w-96 bg-white shadow-lg flex flex-col z-30 origin-top-right animate-scale`}
          >
            {content.map((e) => {
              return (
                <div
                  onClick={e.action}
                  className='w-full p-5 transition hover:bg-gray'
                >
                  <h4 className='text-3xl'>{e.label}</h4>
                </div>
              );
            })}
          </div>
        );
      case 16:
        return (
          <div
            ref={Ref}
            className={`absolute top-16 right-16 w-96 bg-white shadow-lg flex flex-col z-30 origin-top-right animate-scale`}
          >
            {content.map((e) => {
              return (
                <div
                  onClick={e.action}
                  className='w-full p-5 transition hover:bg-gray'
                >
                  <h4 className='text-3xl'>{e.label}</h4>
                </div>
              );
            })}
          </div>
        );
      default:
        return (
          <div
            ref={Ref}
            className={`absolute top-16 right-0 w-96 bg-white shadow-lg flex flex-col z-30 origin-top-right animate-scale`}
          >
            {content.map((e) => {
              return (
                <div
                  onClick={e.action}
                  className='w-full p-5 transition hover:bg-gray'
                >
                  <h4 className='text-3xl'>{e.label}</h4>
                </div>
              );
            })}
          </div>
        );
    }
  };

  return <Fragment>{choosePopUp(right)}</Fragment>;
};

export default PopUp;
