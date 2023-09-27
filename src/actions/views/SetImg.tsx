import SuccessLoginMsg from '../components/SetImgElements/SuccessLoginMsg';
import ImageUpload from '../components/FormElements/ImageUpload';
import { selectUser } from '../redux/user/userSelector';
import Button from '../components/FormElements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postNewUser } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { useForm } from '../hooks/form-hook';
import Spinner from '../components/Spinner';
import React, { Fragment } from 'react';

const SetImg: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: isLoadingUser, user } = useSelector(selectUser);

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      profileImage: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { name, lastName, email, password } = history.state.usr;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profileImage', formState.inputs.profileImage.value);

      dispatch(postNewUser(formData));

      setTimeout(
        () =>
          navigate('/login', {
            replace: true,
          }),
        2000
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className='flex flex-col items-center justify-center w-full h-screen p-10 bg-gradient-radial from-darkPurple to-brightPurple overflow-hidden'>
        {isLoadingUser && <Spinner />}
        {/* {errorUser && <ErrorView userErrorMsg={''} chatErrorMsg={''} chatsErrorMsg={''} contactsErrorMsg={''}/>} */}
        <div className='flex flex-col p-20 justify-center items-center relative w-200 h-3/4 bg-grayLight rounded-3xl animate-mtl'>
          {!user && (
            <Fragment>
              {/* Link go back */}
              <Link
                to='/signup-step-2'
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
              {/* Title */}
              <h2 className='text-5xl mb-16 font-bold text-brightPurple'>
                Choose an image
              </h2>
              <form
                className='flex flex-col justify-center items-center relative w-full h-full'
                onSubmit={(event) => handleSubmit(event)}
              >
                {/* Empty Imagen container*/}
                <div className='w-60 h-60 relative mb-10'>
                  <ImageUpload id='profileImage' onInput={inputHandler} />

                  {/* Avatar icon */}
                  <div className='flex justify-center items-center w-full h-full bg-grayReg border-2 border-dashed rounded-full'>
                    <svg
                      className='w-32 h-36'
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
                  {/* Add btn */}
                </div>
                {/* paragraph */}
                <p className='w-1/2 text-2xl mb-20 text-center'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi illum nulla deserunt,
                </p>
                {/* skip & next btn */}
                <div className='w-1/2 h-auto flex flex-col justify-between space-y-6'>
                  <button
                    className='text-3xl h-16 leading-none font-bold p-3 transition rounded-xl hover:bg-grayReg'
                    type='submit'
                    onClick={() => handleSubmit}
                  >
                    Skip
                  </button>

                  <Button onClick={handleSubmit} disabled={!formState.isValid}>
                    <span className='text-white text-2xl'>Next</span>
                  </Button>
                </div>
              </form>
            </Fragment>
          )}
          <SuccessLoginMsg isSuccess={user ? true : false} />
        </div>
      </div>
    </Fragment>
  );
};

export default SetImg;
