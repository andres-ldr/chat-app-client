import { VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from '../../Util/validators';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { useForm } from '../../hooks/form-hook';
import Button from '../FormElements/Button';
import Input from '../FormElements/input';
import Cookies from 'js-cookie';
import React from 'react';

const LoginForm = () => {
  const { isLoading, error, sendRequest, clearError, isSuccess } =
    useHttpClient();
  const { toggleAuth } = useAuthContext();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const email = formState.inputs.email.value;
      const password = formState.inputs.password.value;
      // console.log(process.env.REACT_APP_BACKEND_URL);

      const responseData = await sendRequest(
        'http://localhost:8000/v1/users/login',
        'POST',
        JSON.stringify({
          email,
          password,
        }),
        {
          'Content-TYpe': 'application/json',
        }
      );
      Cookies.set('auth', 'true');
      toggleAuth(true);
      navigate('/panel', {
        replace: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className='flex flex-col  mb-16 space-y-5'
      onSubmit={(event) => handleSubmit(event)}
    >
      <Input
        element='input'
        id='email'
        type='text'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
        placeholder='Email'
        errorText='Required'
        onInput={inputHandler}
      />

      <Input
        element='input'
        id='password'
        type='password'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
        placeholder='Password'
        errorText='Required'
        onInput={inputHandler}
      />
      <Button onClick={handleSubmit} disabled={!formState.isValid}>
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
