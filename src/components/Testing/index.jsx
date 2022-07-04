import React from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import ErrorBoundary from 'components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'hooks/useAuth';
import { ToastProvider } from 'hooks/useToast';

export const TestComponent = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};
