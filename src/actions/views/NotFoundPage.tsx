import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='min-w-full h-screen bg-slate-100 flex flex-col justify-center items-center space-y-52'>
      <h1 className='text-8xl text-lightPurple font-semibold'>
        404 | Not found
      </h1>
      <div className='text-3xl flex flex-col justify-center items-center space-y-10 font-medium'>
        <h2 className='text-4xl'>Maybe you are looking for:</h2>
        <Link
          to='/'
          className='transition-all hover:font-semibold hover:text-lightPurple'
        >
          Home
        </Link>
        <Link
          to='/login'
          className='transition-all hover:font-semibold hover:text-lightPurple'
        >
          Log In
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
