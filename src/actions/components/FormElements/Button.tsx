import React from 'react';
import { Link } from 'react-router-dom';

interface IButton {
  href?: string;
  to?: string;
  danger?: boolean;
  inverse?: boolean;
  children?: any;
  exact?: any;
  type?: any;
  onClick?: any;
  disabled?: boolean;
  size?: any;
}

const Button: React.FC<IButton> = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={`${props.disabled ? '' : props.to}`}
        className={`button ${props.size || 'button-default'} ${
          props.disabled ? 'button--disabled' : 'button--abled'
        } ${props.danger && 'button-danger'} ${
          props.inverse && 'button-inverse'
        }
        `}
      >
        <span
          className={`min-w-full min-h-full text-2xl select-none ${
            props.disabled ? 'text-black text-opacity-50' : 'text-white '
          } `}
        >
          {props.children}
        </span>
      </Link>
    );
  }
  return (
    <button
      className={`button ${props.size || 'button-default'} ${
        props.disabled ? 'button--disabled' : 'button--abled'
      } ${props.danger && 'button-danger'} ${props.inverse && 'button-inverse'}
      `}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span
        className={`min-w-full min-h-full text-2xl select-none ${
          props.disabled ? 'text-black text-opacity-50' : 'text-white '
        } `}
        onClick={props.onClick}
      >
        {props.children}
      </span>
    </button>
  );
};

export default Button;
