import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import DivisionLine from './DivisionLine';

const LoginSection = () => {
  return (
    <div className='flex flex-col justify-center items-center w-1/2'>
      <div className='flex flex-col w-1/2'>
        {/* title */}
        <h2 className='text-5xl mb-16 font-bold text-brightPurple'>Login</h2>

        <Link
          to='/signup'
          className='link relative w-56 mb-10 text-xl font-bold text-grayDark self-end'
        >
          Create a new account
        </Link>

        <Link
          to='#'
          className='uppercase text-center font-bold shadow-md bg-brightPurple w-full h-16 inline-block pt-3 pb-3 pl-4 pr-4 mb-20 rounded-2xl transition duration-300 hover:bg-darkPurple hover:shadow-xl hover:scale-105 '
        >
          <span className='text-white text-2xl'>Google</span>
        </Link>
        <DivisionLine />
        <LoginForm />
        <Link
          to='#'
          className='link relative w-56  text-2xl font-bold text-grayDark'
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LoginSection;
