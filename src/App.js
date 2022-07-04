import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import { AuthProvider } from 'hooks/useAuth';
import { ToastProvider } from 'hooks/useToast';
import { About, Store, Home, Profile, Basket, AdminPanel } from 'screen';
import { Header, Footer } from 'components';
import { AuthorContainer } from 'screen/Author/components/container';
import { GamePageContainer } from 'screen/Game/components/container';

import './App.css';
import { TimerProvider } from 'hooks/useTimer';

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <AuthProvider>
          <TimerProvider>
            <ToastProvider>
              <AuthProvider>
                <Header />
                <div className="app__content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/game/:id" element={<GamePageContainer />} />
                    <Route path="/author/:id" element={<AuthorContainer />} />
                    <Route path="/user/:id" element={<Profile />} />
                    <Route path="/cart/:id" element={<Basket />} />
                    <Route path="/admin/*" element={<AdminPanel />} />
                  </Routes>
                </div>
                <Footer />
              </AuthProvider>
            </ToastProvider>
          </TimerProvider>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
