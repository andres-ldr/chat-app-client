import { User } from '../types/user';

interface MainNavbarProps {
  user: User | null;
  onLogOut: () => void;
}

const MainNavbar = ({ user, onLogOut }: MainNavbarProps) => {
  return (
    <div className='flex py-1 px-4 bg-slate-950'>
      <div className='flex items-center py-2 px-4 gap-2'>
        <img
          src={`http://localhost:8000/${user?.profileImage}`}
          className='w-10 h-10 object-cover rounded-full'
        />
        <div className='text-slate-200'>
          <p className='font-bold'>
            {user?.name} {user?.lastName}
          </p>
          <p>{user?.email}</p>
          <button onClick={onLogOut} className='text-red-500 font-semibold'>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
