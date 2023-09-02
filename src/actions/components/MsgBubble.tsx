import React, { Fragment } from 'react';

interface MsgBubbleProps {
  isRight?: boolean;
  content: string;
}

const MsgBubble: React.FC<MsgBubbleProps> = ({ content, isRight }) => {
  return (
    <Fragment>
      {isRight ? (
        <div className='w-full flex justify-end p-5'>
          <div className='h-full max-w-2xl inline-flex flex-col p-4 border-2 border-grayReg cursor-pointer bg-grayReg rounded-3xl text-xl'>
            <p className='mb-2'>{content}</p>
            <span className='self-end font-light'>12:03</span>
          </div>
        </div>
      ) : (
        <div className='w-full p-5'>
          <div className='h-full max-w-2xl inline-flex flex-col p-4 border-2 border-gray cursor-pointer bg-white rounded-3xl text-xl'>
            <p className='mb-2'>{content}</p>
            <span className='self-end font-light'>12:03</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MsgBubble;
