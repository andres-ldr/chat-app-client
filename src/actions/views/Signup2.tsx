import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/form-hook';
import Input from '../components/FormElements/input';
import Button from '../components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../Util/validators';

const Signup2: React.FC = () => {
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, lastName } = history.state.usr;
    const { email, password } = formState.inputs;

    navigate('/setimg', {
      replace: true,
      state: {
        name,
        lastName,
        email: email.value,
        password: password.value,
      },
    });
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
      <div className='flex flex-col justify-center items-center relative w-200 h-3/4 bg-grayLight rounded-3xl animate-mtl'>
        <Link
          to='/signup'
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
        <h2 className='text-5xl mb-16 font-bold text-brightPurple'>
          Signup step 2
        </h2>
        <form
          className='flex flex-col w-2/4 mb-16 space-y-10'
          onSubmit={(event) => handleSubmit(event)}
        >
          <Input
            element='input'
            id='email'
            type='text'
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_EMAIL(),
              VALIDATOR_MAXLENGTH(30),
            ]}
            placeholder='Email'
            errorText='Email required'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(8),
              VALIDATOR_MAXLENGTH(30),
            ]}
            placeholder='Password'
            errorText='At least 8 characters required'
            onInput={inputHandler}
          />
          <Button onClick={handleSubmit} disabled={!formState.isValid}>
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup2;
