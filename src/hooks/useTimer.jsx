import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const timerCount = 900;

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [counter, setCounter] = useState(timerCount);
  const { isTimerActive } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    let intervalId = 0;
    if (isTimerActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setSecond(String(computedSecond));
        setMinute(String(computedMinute));

        setCounter((counter) => counter - 1);
      }, 1000);
      if (counter === 0) {
        setCounter(timerCount);
      }
    }
    if (!isTimerActive) {
      setCounter(timerCount);
    }
    return () => clearInterval(intervalId);
  }, [isTimerActive, counter]);

  return <TimerContext.Provider value={{ second, minute }}>{children}</TimerContext.Provider>;
};

export const useTimer = () => useContext(TimerContext);
