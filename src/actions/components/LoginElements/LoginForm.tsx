import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import Spinner from '../Spinner';
import { useLogin } from '../../../services/mutations';
import { useUserStore } from '../../../store/userStore';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const { isLoading } = useHttpClient();
  const [inputType, setInputType] = useState('password');

  const loginMutation = useLogin();
  const { setUser } = useUserStore();

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const onSubmit = async (data: Inputs) => {
    loginMutation.mutate(data);
    reset();
  };

  if (loginMutation.isSuccess) {
    setUser(loginMutation.data.data);
    navigate('/panel', { replace: true });
  }

  return (
    <>
      {loginMutation.error && (
        <div className='fixed inset-0 w-screen h-screen bg-grayDark bg-opacity-20 flex items-center justify-center'>
          <div className='w-1/3 z-50 py-20 px-10 bg-white font-bold shadow-2xl animate-show'>
            <button
              type='button'
              onClick={loginMutation.reset}
              className='text-red'
            >
              Clear
            </button>
            <br />
            {loginMutation.error.message}
          </div>
        </div>
      )}
      {loginMutation.isPending && <Spinner />}
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <label className='font-semibold' htmlFor='name'>
            Email:
          </label>
          <input
            type='email'
            placeholder='example@email.com'
            className='py-2 px-4'
            {...register('email', { required: true })}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label className='font-semibold' htmlFor='password'>
            Password:
          </label>
          <input
            type={inputType}
            className='py-2 px-4'
            {...register('password', { required: true })}
          />
          <button type='button' onClick={toggleInputType}>
            See password
          </button>
        </div>
        <button
          type='submit'
          className='bg-indigo-800 text-white rounded-md py-2 px-4'
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
