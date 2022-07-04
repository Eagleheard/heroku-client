import React from 'react';
import ReactDOM from 'react-dom';

import grey_cross from 'assets/grey-cross.png';

import './styles.scss';

interface IPortal {
  Component: React.FC;
  isOpen: boolean;
  handleClose: () => void;
  text: string;
  style?: string;
}

export const Portal: React.FC<IPortal> = ({ Component, isOpen, text, handleClose, style }) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={`portal portal__${style}`}>
      <button className="portal__close-btn" onClick={handleClose}>
        <img src={grey_cross} />
      </button>
      <h2 className="portal__name">{text}</h2>
      <Component />
    </div>,
    document.body,
  );
};
