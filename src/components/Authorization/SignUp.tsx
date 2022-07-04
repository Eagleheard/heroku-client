import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from 'hooks/useAuth';
import { registration } from 'api/authorization';
import { Button } from 'components/Button';
import { ISign, IUser } from 'types/interfaces';

import './styles.scss';

export const SignUp: React.FC<ISign> = ({ handleSwitch, style }) => {
  const { user } = useAuth();
  const [error, setError] = useState<string>('');
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const signUp = async (params: IUser) => {
    try {
      await registration(params);
      handleSwitch();
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setError(String(message));
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    if (!user) {
      return signUp(data);
    }
    if (user.role === 'ADMIN') {
      reset();
      return signUp({ ...data, role: 'MANAGER' });
    }
  };

  return (
    <div className="login">
      {user && <h1>Create manager</h1>}
      <form onSubmit={handleSubmit(submitForm)} className="login__form">
        <div className="login__group">
          <input
            type="text"
            id="name"
            maxLength={20}
            placeholder="name"
            onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
            className="login__name"
            {...register('name', {
              required: true,
              validate: (value) => value.length !== 0,
            })}
          />
          <label htmlFor="name" className="login__label">
            First Name
          </label>
          {errors.name && <p className="login__name--error">Name cannot be empty</p>}
        </div>
        <div className="login__group">
          <input
            type="text"
            id="lastname"
            placeholder="lastname"
            maxLength={20}
            onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
            className="login__lastname"
            {...register('lastName', {
              required: true,
              validate: (value) => value.length !== 0,
            })}
          />
          <label htmlFor="lastname" className="login__label">
            Last Name
          </label>
          {errors.lastName && <p className="login__lastname--error">Last name cannot be empty</p>}
        </div>
        <div className="login__group">
          <input
            type="email"
            id="email"
            placeholder="email"
            className="login__email"
            {...register('email', {
              required: true,
            })}
          />
          <label htmlFor="email" className="login__label">
            Email
          </label>
          {error && <p className="login__email--error">{error}</p>}
        </div>
        <div className="login__group">
          <input
            type="password"
            autoComplete="on"
            id="password"
            minLength={8}
            placeholder="password"
            className="login__password"
            {...register('password', {
              required: true,
            })}
          />
          <label htmlFor="password" className="login__label">
            Password
          </label>
        </div>
        <div className={`login__submit login__submit--${style}`}>
          {!user && (
            <div className="login__sign-up">
              <h5 className="login__sign">Or</h5>
              <h5 className="login__sign--link" onClick={handleSwitch}>
                sign In
              </h5>
            </div>
          )}
          <Button text="Sign Up" onClick={() => submitForm} style="sign-in" />
        </div>
      </form>
    </div>
  );
};
