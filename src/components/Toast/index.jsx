import React, { useEffect } from 'react';
import classNames from 'classnames';

import { useToast } from 'hooks';
import error from 'assets/error.svg';
import success from 'assets/success.svg';

import './styles.scss';

export const ToastComponent = () => {
  const { setIsToastVisible, isToastVisible, toastType, message } = useToast();

  useEffect(() => {
    setIsToastVisible(false);
  }, []);

  return (
    <div
      className={classNames('snackbar', {
        snackbar__show: isToastVisible,
        'snackbar__show--success': toastType === 'success',
        'snackbar__show--error': toastType === 'error',
      })}
    >
      <div className="snackbar__content">
        <img className="snackbar__icon" src={toastType === 'success' ? success : error} />
        <p className="snackbar__message">{message}</p>
      </div>
    </div>
  );
};
