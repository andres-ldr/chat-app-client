import { VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from '../../Util/validators';
import { postLogIn } from '../../redux/user/userSlice';
import { useForm } from '../../hooks/form-hook';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import Button from '../FormElements/Button';
import { useDispatch } from 'react-redux';
import Input from '../FormElements/input';
import React from 'react';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;

    dispatch(postLogIn({ email, password }));

    navigate('/panel', { replace: true });
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
