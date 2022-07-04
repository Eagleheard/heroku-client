import React from 'react';

import { useTimer } from 'hooks/useTimer';

import './styles.scss';

export const Timer = () => {
  const { minute, second } = useTimer();
  return (
    <div className="timer">
      <p className="timer__notification">Time to clean cart: </p>
      <div className="timer__container">
        <span className="timer__minute">{minute}</span>
        <span>:</span>
        <span className="timer__second">{second}</span>
      </div>
    </div>
  );
};
