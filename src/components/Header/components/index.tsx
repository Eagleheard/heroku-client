import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { fetchGames } from 'api/fetchGames';
import { ResponsiveHeader } from './responsive';
import { SignIn, SignUp, Portal, Select, Search, ToastComponent } from 'components';
import { authorization, logout } from 'api/authorization';
import { useAuth } from 'hooks/useAuth';
import { IGame } from 'types/interfaces';

import logo from 'assets/logo.png';
import menu from 'assets/menu.png';

import './style.scss';

enum sortOptions {
  PROFILE = 'Profile',
  LOGOUT = 'Logout',
  CART = 'Cart',
}

export const Header = () => {
  const { user, setUser } = useAuth();
  const [isNavVisible, setNavVisibility] = useState<boolean>(false);
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);
  const [games, setGames] = useState<IGame[]>([]);
  const { openToast } = useToast();
  const userToken = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleSwitch = () => {
    if (isSignInVisible) {
      setIsSignInVisible(false);
      setIsSignUpVisible(true);
      return;
    }
    if (isSignUpVisible) {
      setIsSignInVisible(true);
      setIsSignUpVisible(false);
      return;
    }
  };

  const fillGames = useCallback(async () => {
    try {
      const { data } = await fetchGames();
      setGames(data.rows);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  }, []);

  const onChangeSearch = (value: string) => {
    const game = games.find(({ name }) => name === value);
    navigate(`/game/${game?.id}`);
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case sortOptions.PROFILE:
        navigate(`/user/${user.id}`);
        break;
      case sortOptions.CART:
        navigate(`/cart/${user.id}`);
        break;
      case sortOptions.LOGOUT:
        signOut();
        navigate('/');
        break;
    }
  };

  const checkUser = async () => {
    try {
      const { data } = await authorization();
      setUser(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      if (message !== 'Need autorization') {
        openToast(String(message), ToastOptions.error);
      }
    }
  };

  const signOut = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('token');
    setIsSignInVisible(false);
    setNavVisibility(false);
    navigate('/');
  };

  useEffect(() => {
    if (userToken) {
      checkUser();
    }
    fillGames();
  }, []);

  return (
    <header className="header">
      <img onClick={() => navigate('/')} src={logo} className="header__logo" alt="logo"></img>
      <nav className="navbar">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link  link">
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/store" className="navbar__link  link">
              Store
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/about" className="navbar__link link">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      {isNavVisible && (
        <ResponsiveHeader
          setNavVisibility={setNavVisibility}
          setIsSignInVisible={() => setIsSignInVisible((prevValue) => !prevValue)}
          signOut={signOut}
        />
      )}
      <Search games={games} onChangeSearch={onChangeSearch} />
      <div className="header__sign">
        {user ? (
          <Select
            placeholder={`Hi, ${user.name}`}
            options={[
              { id: 0, label: 'Profile', value: 'Profile' },
              { id: 1, label: 'Cart', value: 'Cart' },
              { id: 2, label: 'Logout', value: 'Logout' },
            ]}
            style="header"
            isHeaderMode
            handleSelect={handleSelect}
          />
        ) : (
          <button
            className="header__login  link"
            onClick={() => setIsSignInVisible((prevValue) => !prevValue)}
            disabled={isSignUpVisible}
          >
            Login
          </button>
        )}
      </div>
      <img
        alt="burger"
        className="header__btn"
        onClick={() => setNavVisibility((prevCount) => !prevCount)}
        src={menu}
      ></img>
      {isSignInVisible && !user && (
        <Portal
          Component={() => <SignIn handleSwitch={handleSwitch} />}
          isOpen={isSignInVisible}
          text="Sign In"
          handleClose={() => setIsSignInVisible(false)}
        />
      )}
      {isSignUpVisible && (
        <Portal
          Component={() => <SignUp handleSwitch={handleSwitch} />}
          isOpen={isSignUpVisible}
          text="Sign Up"
          handleClose={() => setIsSignUpVisible(false)}
        />
      )}
      <ToastComponent />
    </header>
  );
};
