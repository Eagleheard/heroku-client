import React, { useState, useEffect, useCallback } from 'react';
import { fetchGames } from 'api/fetchGames';

import { useIsUnmounted } from 'hooks/useIsUnmounted';
import { fetchPreviewGames } from 'api/fetchPreviewGames';
import { ToastOptions } from 'types/enumerators';
import { ToastComponent } from 'components/Toast';
import { Card } from 'screen';
import { useToast } from 'hooks';
import { Pagination, Select, Preview, Loader } from 'components';

import { IGame } from 'types/interfaces';

import './style.scss';

const DATA_LIMIT = 4;

enum sortOptions {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
}

interface IParams {
  isNew?: boolean;
  order?: string;
}

export const Home = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [previewGames, setPreviewGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [params, setParams] = useState<IParams>();
  const [totalPages, setTotalPages] = useState(0);
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
          setIsLoading(false);
        }
      } catch ({
        response: {
          data: { message },
        },
      }) {
        openToast(message, ToastOptions.error);
      }
    },
    [currentPage],
  );

  const getPreviewGames = async () => {
    try {
      const { data } = await fetchPreviewGames();
      if (!isUnmouted.current) {
        setPreviewGames(data.rows);
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(message, ToastOptions.error);
    }
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case sortOptions.OUR_GAMES:
        setParams({});
        break;
      case sortOptions.NEW_GAMES:
        setParams({ isNew: true });
        break;
      case sortOptions.POPULAR_GAMES:
        setParams({ order: 'popularity' });
        break;
      default:
        setParams({});
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    fillGames(params);
    getPreviewGames();
  }, [currentPage, params, fillGames]);

  return (
    <div className="home">
      <div className="home__container">
        {!games.length || !previewGames ? (
          <Loader />
        ) : (
          <>
            <Preview previewGames={previewGames} />
            <Select
              placeholder="Our games"
              options={[
                { id: 0, label: 'Our games', value: 'Our games' },
                { id: 1, label: 'New games', value: 'New games' },
                { id: 2, label: 'Popular games', value: 'Popular games' },
              ]}
              style="home"
              handleSelect={handleSelect}
            />
            {isLoading ? (
              <Loader />
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
          </>
        )}
      </div>
      <ToastComponent />
    </div>
  );
};
