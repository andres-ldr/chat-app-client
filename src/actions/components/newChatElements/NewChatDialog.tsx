import React, { Fragment, useEffect, useRef } from 'react';
import Input from '../FormElements/input';
import { useForm } from '../../hooks/form-hook';
import Button from '../FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Util/validators';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewChatDialog } from '../../redux/newChatDialog/newChatDialogSelector';
import { toggleNewChatDialog } from '../../redux/newChatDialog/newChatDialogSlice';
import { postNewContact } from '../../redux/contact/contactsSlice';
import { AppDispatch } from '../../redux/store';
import { selectContacts } from '../../redux/contact/contactsSelector';

const NewChatDialog: React.FC = () => {
  const newChatDialogIsVisible = useSelector(selectNewChatDialog);
  const newDialogElementRef = useRef<HTMLDivElement>(null);
  const { isLoading, error } = useSelector(selectContacts);
  const dispatch = useDispatch<AppDispatch>();

  const [formState, inputHandler] = useForm(
    {
      alias: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const handler = (e: any) => {
      if (newDialogElementRef.current) {
        if (!newDialogElementRef.current.contains(e.target)) {
          dispatch(toggleNewChatDialog(false));
        }
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const alias = formState.inputs.alias.value;
    const email = formState.inputs.email.value;

    dispatch(postNewContact({ alias, email }));

    if (!isLoading) dispatch(toggleNewChatDialog(false));
  };

  return (
    <div
      ref={newDialogElementRef}
      className={`${
        newChatDialogIsVisible ? 'flex' : 'hidden'
      } absolute flex-col justify-center items-center w-[500px] h-1/2 p-10 bg-grayLight shadow-lg rounded-2xl space-y-10 animate-showDialog z-30`}
    >
      {!isLoading && (
        <Fragment>
          <h2 className='text-4xl font-medium'>Add new contact</h2>
          <form className='w-3/4 flex flex-col space-y-32'>
            <div className='space-y-7'>
              <Input
                element='input'
                id='alias'
                type='text'
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(2),
                  VALIDATOR_MAXLENGTH(20),
                ]}
                placeholder='Alias'
                onInput={inputHandler}
              />
              <Input
                element='input'
                id='email'
                type='text'
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                placeholder='Email'
                onInput={inputHandler}
              />
            </div>
            <div className='w-full h-auto flex flex-col justify-between space-y-6'>
              <button
                className='text-3xl h-16 leading-none font-bold p-3 transition rounded-xl hover:bg-grayReg'
                type='submit'
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(toggleNewChatDialog(!newChatDialogIsVisible));
                }}
              >
                Cancel
              </button>
              <Button onClick={handleSubmit} disabled={!formState.isValid}>
                Create contact
              </Button>
            </div>
          </form>
        </Fragment>
      )}
      {isLoading && <h1>Loading</h1>}
      {/* {error && <h1>{error}</h1>} */}
    </div>
  );
};

export default NewChatDialog;
