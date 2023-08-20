import React, { useReducer, useEffect } from 'react';
import { validate } from '../../Util/validators';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

interface IInput {
  element: string;
  id: string;
  value?: string;
  valid?: boolean;
  type: string;
  validators: any;
  placeholder?: string;
  errorText?: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  rows?: number;
}

const Input: React.FC<IInput> = (props: IInput) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event: any) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const getElement = () => {
    switch (props.element) {
      case 'input':
        return (
          <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
            className={`min-w-full ${
              !inputState.isValid &&
              inputState.isTouched &&
              'shadow-inputInvalid'
            }  mb-2 text-2xl h-16 bg-grayReg placeholder-grayDark rounded-2xl pl-5 outline-none transition focus:shadow-input`}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
          />
        );

      case 'file':
        return (
          <input
            type='file'
            id={props.id}
            onChange={changeHandler}
            value={inputState.value}
            className='absolute flex w-12 h-12 bg-brightPurple rounded-full bottom-3 right-3 text-white items-center justify-center text-4xl leading-none transition hover:bg-darkPurple hover:scale-110 hover:cursor-pointer'
          />
        );

      default:
        break;
    }
  };

  const element = getElement();

  return (
    <div className='min-w-full'>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className='text-red text-xl'>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
