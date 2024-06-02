import {
  Control,
  useForm,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import { useState } from 'react';
import Spinner from '../Spinner';
import { useCreateUser } from '../../../services/mutations';
import { useNavigate } from 'react-router-dom';

interface Inputs {
  name: string;
  lastName: string;
  password: string;
  email: string;
  //   confirmPassword: string;
  profileImage: string;
}

const MultiStepForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      name: '',
      lastName: '',
      password: '',
      email: '',
      profileImage: '',
    },
  });
  // const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <Form1 register={register} />,
      <Form2 register={register} />,
      <Form3 register={register} />,
    ]);

  const createUserMutation = useCreateUser();

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('profileImage', data.profileImage[0]);

    // await sendRequest('http://localhost:8000/v1/users/new', 'POST', formData);
    createUserMutation.mutate(formData);
  };
  
  if (createUserMutation.isSuccess) {
    navigate('/', { replace: true });
  }

  return (
    <form
      className='py-20 px-32 flex flex-col justify-center items-center gap-10 relative bg-grayLight rounded-3xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      {createUserMutation.error && (
        <div className='fixed w-1/2 z-50 py-20 px-10 bg-white font-bold shadow-2xl'>
          <button
            type='button'
            onClick={createUserMutation.reset}
            className='text-red'
          >
            Clear
          </button>
          {createUserMutation.error.message}
        </div>
      )}
      {createUserMutation.isPending && <Spinner />}
      {currentStepIndex + 1}/{steps.length}
      {step}
      <div className='flex gap-5'>
        {!isFirstStep && (
          <button
            type='button'
            onClick={back}
            className='bg-indigo-800 text-white rounded-md py-2 px-4'
          >
            Back
          </button>
        )}
        {!isLastStep && (
          <button
            type='button'
            onClick={next}
            className='bg-indigo-800 text-white rounded-md py-2 px-4'
          >
            Next
          </button>
        )}
        {isLastStep && (
          <button
            type='submit'
            className='bg-indigo-800 text-white rounded-md py-2 px-4'
            disabled={createUserMutation.isPending}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;

interface FormProps {
  register: UseFormRegister<Inputs>;
  control?: Control<Inputs>;
  reset?: UseFormReset<Inputs>;
}

const Form1 = ({ register }: FormProps) => {
  return (
    <div className='flex flex-col gap-8 animate-mtl'>
      <span className='text-xl font-bold text-center'>
        Set Name and Last Name
      </span>
      <div className='flex flex-col gap-4'>
        <label className='font-semibold' htmlFor='name'>
          Name:
        </label>
        <input
          type='text'
          placeholder='John'
          className='py-2 px-4'
          {...register('name', { required: true })}
        />
      </div>
      <div className='flex flex-col gap-4'>
        <label className='font-semibold' htmlFor='lastName'>
          Last Name:
        </label>
        <input
          type='text'
          placeholder='Doe'
          className='py-2 px-4'
          {...register('lastName', { required: true })}
        />
      </div>
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
    </div>
  );
};

const Form2 = ({ register }: FormProps) => {
  const [inputType, setInputType] = useState('password');

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const checkPassword = () => {
    const password = document.querySelector<HTMLInputElement>(
      'input[name="password"]'
    )?.value;
    const confirmPassword = document.querySelector<HTMLInputElement>(
      'input[name="confirmPassword"]'
    )?.value;

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className='flex flex-col gap-8 animate-mtl'>
      <span className='text-xl font-bold text-center'>Set a Password</span>
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
      <div className='flex flex-col gap-4'>
        <label className='font-semibold' htmlFor='confirmPassword'>
          Comfirm password:
        </label>
        <input type='password' className='py-2 px-4' onChange={checkPassword} />
      </div>
    </div>
  );
};

const Form3 = ({ register }: FormProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onFileUploaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      setFile(filesArray[0]);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-8 animate-mtl'>
      <span className='text-xl font-bold text-center'>
        Set a Profile Picture
      </span>
      {file ? (
        <label htmlFor='profileImage' className='w-32 h-32 rounded-full'>
          <img
            src={URL.createObjectURL(file)}
            className='w-full h-full object-cover object-top rounded-full'
          />
        </label>
      ) : (
        <div className='w-20 h-20 flex justify-center items-center bg-grayReg border-2 border-dashed rounded-full'>
          <svg
            className='w-full h-full object-cover rounded-full'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0ZM6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5Z'
              fill='#474747'
            />
            <path
              d='M5 12C3.67392 12 2.40215 12.5268 1.46447 13.4645C0.526784 14.4021 0 15.6739 0 17V19C0 19.5523 0.447715 20 1 20C1.55228 20 2 19.5523 2 19V17C2 16.2043 2.31607 15.4413 2.87868 14.8787C3.44129 14.3161 4.20435 14 5 14H13C13.7956 14 14.5587 14.3161 15.1213 14.8787C15.6839 15.4413 16 16.2044 16 17V19C16 19.5523 16.4477 20 17 20C17.5523 20 18 19.5523 18 19V17C18 15.6739 17.4732 14.4021 16.5355 13.4645C15.5979 12.5268 14.3261 12 13 12H5Z'
              fill='#474747'
            />
          </svg>
        </div>
      )}
      <div className='flex flex-col gap-4'>
        <input
          type='file'
          className=''
          {...register('profileImage', {
            // required: true,
            onChange: onFileUploaderChange,
          })}
        />
      </div>
      {/* paragraph */}
      <p className='text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi illum
        nulla deserunt,
      </p>
      {/* skip & next btn */}
      {/* <div className='w-1/2 h-auto flex flex-col justify-between space-y-6'>
        <button
          className='text-3xl h-16 leading-none font-bold p-3 transition rounded-xl hover:bg-grayReg'
          type='submit'
          onClick={() => console.log('skip')}
        >
          Skip
        </button>
      </div> */}
    </div>
  );
};
