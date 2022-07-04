import React, { createContext, useContext, useState } from 'react';

const toastTimeout = 5000;

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('Something wrong');
  const [toastType, setToastType] = useState('success');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const openToast = (message, toastType) => {
    setMessage(message);
    setToastType(toastType);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, toastTimeout);
  };

  return (
    <ToastContext.Provider
      value={{
        message,
        toastType,
        isToastVisible,
        openToast,
        setIsToastVisible,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
