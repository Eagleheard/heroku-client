import React, { useState, useEffect, useCallback } from 'react';
import { fetchGames } from 'api/fetchGames';

import { useIsUnmounted } from 'hooks/useIsUnmounted';
import { ToastComponent } from 'components/Toast';
import { ToastOptions } from 'types/enumerators';
import { Card } from 'screen';
import { Pagination, Select, ResponsiveFilter, Loader } from 'components';
import { Filter } from 'components/Filter';
import { IGame } from 'types/interfaces';
import { useToast } from 'hooks';

import filter from 'assets/filter.png';

import './style.scss';

const DATA_LIMIT = 8;
enum sortOptions {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
  LOW_PRICE = 'Low to high',
  HIGH_PRICE = 'High to low',
}

interface IParams {
  isNew?: boolean;
  order?: string;
  price?: string;
}

export const Store = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [params, setParams] = useState<IParams>();
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { openToast } = useToast();
  const isUnmouted = useIsUnmounted();

  const fillGames = useCallback(
    async (params?: IParams) => {
      try {
        setIsLoading(true);
        const { data } = await fetchGames(currentPage, DATA_LIMIT, { params });
        if (!isUnmouted.current) {
          setGames(data.rows);
          setTotalPages(data.count);
          setError('');
          setIsFilterVisible(false);
          setIsLoading(false);
        }
        if (data.count === 0) {
          setError('Games not found');
        }
      } catch ({ response: { data } }) {
        openToast(String(data), ToastOptions.error);
      }
    },
    [currentPage],
  );

  const setFilter = () => {
    setIsFilterVisible((prevValue) => !prevValue);
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case sortOptions.OUR_GAMES:
        setParams({});
        fillGames();
        break;
      case sortOptions.NEW_GAMES:
        setParams({ isNew: true });
        fillGames(params);
        break;
      case sortOptions.POPULAR_GAMES:
        setParams({ order: 'popularity' });
        fillGames(params);
        break;
      case sortOptions.LOW_PRICE:
        setParams({ price: 'lowPrice' });
        fillGames(params);
        break;
      case sortOptions.HIGH_PRICE:
        setParams({ price: 'highPrice' });
        fillGames(params);
        break;
      default:
        fillGames();
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    fillGames(params);
  }, [currentPage, params, fillGames]);

  return (
    <div className="store" data-testid="store">
      <Filter fillGames={fillGames} />
      {isFilterVisible && (
        <ResponsiveFilter fillGames={fillGames} handleClose={() => setIsFilterVisible(false)} />
      )}
      <div className="store__container">
        <div className="store__options">
          <img src={filter} className="store__filter-icon" onClick={() => setFilter()} />
          <div className="store__filters">
            <Select
              placeholder="Our games"
              options={[
                { id: 0, label: 'Our games', value: 'Our games' },
                { id: 1, label: 'New games', value: 'New games' },
                { id: 2, label: 'Popular games', value: 'Popular games' },
              ]}
              style="store"
              handleSelect={handleSelect}
            />
            <Select
              placeholder="Price"
              options={[
                { id: 0, label: 'Low to high', value: 'Low to high' },
                { id: 1, label: 'High to low', value: 'High to low' },
              ]}
              style="store"
              handleSelect={handleSelect}
            />
          </div>
        </div>
        {(!games.length && !error) || isLoading ? (
          <Loader />
        ) : error ? (
          <h1 className="store__error">{error}</h1>
        ) : (
          <Pagination
            RenderComponent={Card}
            getPaginatedData={games}
            currentPage={currentPage}
            totalCount={totalPages}
            pageSize={DATA_LIMIT}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}
      </div>
      <ToastComponent />
    </div>
  );
};
