import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGameByAuthor } from 'api/fetchGameByAuthor';
import { fetchAuthor } from 'api/fetchAuthor';

import { ToastOptions } from 'types/enumerators';
import { IAuthor, IGame } from 'types/interfaces';
import { Author } from '.';
import { Loader } from 'components';
import { useToast } from 'hooks';

export const AuthorContainer = () => {
  const { id } = useParams<string>();
  const [authorInfo, setAuthorInfo] = useState<IAuthor>();
  const [authorGames, setAuthorGames] = useState<IGame[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { openToast } = useToast();
  const navigate = useNavigate();

  const searchAuthor = useCallback(async () => {
    try {
      const { data } = await fetchAuthor(id);
      setAuthorInfo(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
      navigate('/');
    }
  }, [id]);

  const searchAuthorGames = useCallback(async () => {
    try {
      const { data } = await fetchGameByAuthor(id);
      setAuthorGames(data.rows);
      setTotalPages(data.count);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  }, [id]);

  useEffect(() => {
    searchAuthor();
    searchAuthorGames();
  }, [searchAuthor, searchAuthorGames]);

  return !authorInfo || !authorGames ? (
    <Loader />
  ) : (
    <Author {...authorInfo} authorGames={authorGames} totalPages={totalPages} />
  );
};
