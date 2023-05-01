import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='flex justify-between pt-10 pl-28 pr-28 fixed top-0 left-0 right-0 z-40'>
      <h2 className='text-white'>Auth</h2>
      <div className='flex  justify-between'>
        <Link to='/login' className='link relative text-white text-3xl mr-20'>
          Log In
        </Link>
        <a
          href='#'
          className='flex justify-center uppercase shadow-md bg-brightPurple pt-3 pb-3 pl-8 pr-8  rounded-full transition duration-300 hover:bg-lightPurple hover:shadow-xl hover:scale-105 '
        >
          <span className='mr-3 text-3xl text-white'>download</span>
          <svg
            className='w-7'
            viewBox='0 0 19 20'
            fill='#ffff'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.45 1C10.45 0.447715 10.0247 0 9.5 0C8.97533 0 8.55 0.447715 8.55 1V10.5858L5.42175 7.29289C5.05075 6.90237 4.44925 6.90237 4.07825 7.29289C3.70725 7.68342 3.70725 8.31658 4.07825 8.70711L8.82825 13.7071C9.19925 14.0976 9.80075 14.0976 10.1718 13.7071L14.9218 8.70711C15.2927 8.31658 15.2927 7.68342 14.9218 7.29289C14.5508 6.90237 13.9492 6.90237 13.5782 7.29289L10.45 10.5858V1Z'
              fill='#fffff'
            />
            <path
              d='M0.95 12C1.47467 12 1.9 12.4477 1.9 13V17C1.9 17.2652 2.00009 17.5196 2.17825 17.7071C2.35641 17.8946 2.59804 18 2.85 18H16.15C16.402 18 16.6436 17.8946 16.8218 17.7071C16.9999 17.5196 17.1 17.2652 17.1 17V13C17.1 12.4477 17.5253 12 18.05 12C18.5747 12 19 12.4477 19 13V17C19 17.7957 18.6997 18.5587 18.1653 19.1213C17.6308 19.6839 16.9059 20 16.15 20H2.85C2.09413 20 1.36922 19.6839 0.834746 19.1213C0.300267 18.5587 0 17.7957 0 17V13C0 12.4477 0.425329 12 0.95 12Z'
              fill='#ffff'
            />
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
