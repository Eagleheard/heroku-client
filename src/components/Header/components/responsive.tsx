import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

import './responsive-style.scss';

interface ResponsiveHeaderProps {
  setNavVisibility: (navVisible: boolean) => void;
  setIsSignInVisible: () => void;
  signOut: () => void;
}

export const ResponsiveHeader = ({
  setNavVisibility,
  setIsSignInVisible,
  signOut,
}: ResponsiveHeaderProps) => {
  const { user } = useAuth();

  const handleClick = () => {
    setNavVisibility(false);
  };

  const handleLogin = () => {
    setNavVisibility(false);
    setIsSignInVisible();
  };

  return (
    <div className="responsive-header">
      <nav className="mobile-nav">
        <NavLink to="/" className="mobile-nav__item  link" onClick={handleClick}>
          Home
        </NavLink>
        <NavLink to="/store" className="mobile-nav__item  link" onClick={handleClick}>
          Store
        </NavLink>
        <NavLink to="/about" className="mobile-nav__item  link" onClick={handleClick}>
          About
        </NavLink>
        <div className="mobile-nav__split"></div>
        {user ? (
          <>
            <NavLink
              to={`/user/${user.id}`}
              className="mobile-nav__item  link"
              onClick={handleClick}
            >
              Profile
            </NavLink>
            <NavLink
              to={`/cart/${user.id}`}
              className="mobile-nav__item  link"
              onClick={handleClick}
            >
              Cart
            </NavLink>
            <button className="header__login  link" onClick={signOut}>
              Logout
            </button>
          </>
        ) : (
          <button className="header__login  link" onClick={handleLogin}>
            Login
          </button>
        )}
      </nav>
    </div>
  );
};
