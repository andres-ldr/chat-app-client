import React from 'react';
import LeftLoginSection from './LeftLoginSection';
import LoginSection from './LoginSection';

const CentralLoginSection = () => {
  return (
    <div className='flex rounded-3xl w-500 h-250 bg-grayLight animate-mtl'>
      <LeftLoginSection />
      <LoginSection />
    </div>
  );
};

export default CentralLoginSection;
