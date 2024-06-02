import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className='fixed w-screen h-screen bg-gray bg-opacity-25 flex justify-center items-center text-center z-50'>
      <div className='w-20 h-20 rounded-full border-8 border-pink-500 border-r-white border-l-white border-b-white animate-spin'></div>
    </div>
  );
};

export default Spinner;
