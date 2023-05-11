import React from 'react';

interface PopUpProps {
  Ref: React.RefObject<HTMLDivElement>;
  right: number;
  content: {
    label: string;
    action: () => void;
  }[];
}

const PopUp: React.FC<PopUpProps> = ({ Ref, right, content }) => {
  return (
    <div
      ref={Ref}
      className={`absolute top-20 right-${right} w-96 bg-white shadow-lg flex flex-col z-30 origin-top-right animate-scale`}
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
};

export default PopUp;
