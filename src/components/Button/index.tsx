import React from 'react';

import './styles.scss';

interface IButton {
  text: string;
  onClick: () => void;
  style: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

export const Button: React.FC<IButton> = ({ text, onClick, style, disabled, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={style}
      className={`navigation navigation__${style}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
