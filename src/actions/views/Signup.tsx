import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      <div className='flex flex-col justify-center items-center relative w-200 h-3/4 bg-grayLight rounded-3xl animate-mtl'>
        <Link
          to='/login'
          className='absolute top-8 left-8 p-1  w-10 transition hover:scale-125 hover:bg-grayReg rounded-full'
        >
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.70711 1.70711C9.09763 1.31658 9.09763 0.683417 8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L7.29289 15.7071C7.68342 16.0976 8.31658 16.0976 8.70711 15.7071C9.09763 15.3166 9.09763 14.6834 8.70711 14.2929L3.41421 9L15 9C15.5523 9 16 8.55229 16 8C16 7.44772 15.5523 7 15 7L3.41421 7L8.70711 1.70711Z'
              fill='#180A38'
            />
          </svg>
        </Link>
        <h2 className='text-5xl mb-16 font-bold text-brightPurple'>Signup</h2>
        <form className='flex flex-col w-1/2 mb-16' action=''>
          <input
            type='text'
            name=''
            id=''
            placeholder='Username'
            className='text-2xl h-16 bg-grayReg placeholder-grayDark rounded-2xl mb-10 pl-5 outline-none transition focus:shadow-input'
          />
          <input
            type='email'
            name=''
            id=''
            placeholder='Email'
            className='text-2xl h-16 bg-grayReg placeholder-grayDark outline-none rounded-2xl mb-10 pl-5 transition focus:shadow-input'
          />

          <input
            type='password'
            name=''
            id=''
            placeholder='Password'
            className='text-2xl h-16 bg-grayReg placeholder-grayDark  outline-none border-grayDark rounded-2xl pl-5 transition focus:shadow-input'
          />
        </form>
        <Link
          to='/setimg'
          className='uppercase text-center font-bold shadow-md bg-brightPurple w-1/2 h-16 inline-block pt-3 pb-3 pl-4 pr-4 mb-20 rounded-2xl transition duration-300 hover:bg-darkPurple hover:shadow-xl hover:scale-105 '
        >
          <span className='text-white text-2xl'>Next</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
