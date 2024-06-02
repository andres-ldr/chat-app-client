import React from 'react';
import LeftArrow from '../components/icons/LeftArrow';
import Lock from '../components/icons/Lock';
import LoginSection from '../components/LoginElements/LoginSection';

const Login: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      <div className='flex rounded-3xl w-1/2 h-4/6 bg-grayLight animate-mtl'>
        {/* Left */}
        <div className='relative w-1/2 bg-lightPurple rounded-l-3xl'>
          <LeftArrow className='w-8 h-8 p-1 absolute top-4 left-4 transition hover:scale-110 hover:bg-brightPurple hover:bg-opacity-40 rounded-full hover:cursor-pointer z-10' />
          <Lock className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full' />
        </div>
        <LoginSection />
      </div>
    </div>
  );
};

export default Login;
