import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DiscountsReducerState } from 'toolkitStore/types';
import { ToastOptions } from 'types/enumerators';
import { addDiscounts } from 'toolkitStore/thunk';
import { IGame } from 'types/interfaces';
import { useToast } from 'hooks';
import { ToastComponent, Search, Button } from 'components';
import { fetchGames } from 'api/fetchGames';

import gameIcon from 'assets/gameIcon.png';

import './styles.scss';

export const Discount: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const { openToast } = useToast();
  const { discountError, isLoading } = useSelector(
    (state: DiscountsReducerState) => state.discountsReducer || [],
  );
  const allGames = {
    name: 'All',
    image: gameIcon,
    id: games.length + 1,
    genre: {
      name: '',
      id: 0,
    },
    author: {
      name: '',
      id: 0,
      location: '',
      description: '',
      popularity: 0,
    },
    price: 0,
    count: 0,
    comment: '',
    user: {
      name: '',
      lastName: '',
      photo: '',
    },
  };

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const fillGames = async () => {
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
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch(addDiscounts(data));
    reset();
    if (!discountError && !isLoading) {
      openToast('Successfully created', ToastOptions.success);
    }
  };

  useEffect(() => {
    fillGames();
    if (discountError) {
      openToast(discountError, ToastOptions.error);
    }
  }, [discountError, isLoading]);

  return (
    <div className="discount">
      <h1>Discounts</h1>
      <form onSubmit={handleSubmit(submitForm)} className="discount__form">
        <Controller
          name="gameName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Search
              games={games.map((game) => game, (games[games.length - 1] = allGames))}
              onChangeSearch={onChange}
              reset={value}
            />
          )}
        />
        <div className="discount__group">
          <input
            {...register('discountCount', {
              required: true,
            })}
            id="discountCount"
            placeholder="Count"
            className="discount__count"
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
          <label htmlFor="discountCount" className="discount__label">
            Count
          </label>
          {errors.count && <p className="discount__errors">Count cannot be empty</p>}
        </div>
        <div className="discount__group">
          <input
            {...register('startDiscount', {
              required: true,
            })}
            id="date"
            type="date"
            placeholder="Date"
            className="discount__price"
          />
          <label htmlFor="date" className="discount__label">
            Start discount
          </label>
        </div>
        <div className="discount__group">
          <input
            {...register('endDiscount', {
              required: true,
            })}
            id="date"
            type="date"
            placeholder="Date"
            className="discount__price"
          />
          <label htmlFor="date" className="discount__label">
            End discount
          </label>
        </div>
        <div className="discount__submit">
          <Button text="Create discount" onClick={() => submitForm} style="discount" />
        </div>
      </form>
      <ToastComponent />
    </div>
  );
};
