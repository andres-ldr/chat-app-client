import CentralLoginSection from '../components/LoginElements/CentralLoginSection';
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      <CentralLoginSection />
    </div>
  );
};

export default Login;
