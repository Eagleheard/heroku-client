import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from 'config';

import { IGame } from 'types/interfaces';
import { GamePage } from '.';
import { fetchGame } from 'api/fetchGame';
import { useToast } from 'hooks';
import { ToastOptions } from 'types/enumerators';
import { Loader } from 'components';

export const GamePageContainer = () => {
  const { id } = useParams<string>();
  const [gameInfo, setGameInfo] = useState<IGame>();
  const { openToast } = useToast();
  const navigate = useNavigate();

  const fetchGameInfo = useCallback(async () => {
    try {
      const { data } = await fetchGame(id);
      setGameInfo(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
      navigate('/');
    }
  }, [id, openToast]);

  useEffect(() => {
    fetchGameInfo();
    socket.connect();
    socket.on('newGameInfo', (data) => {
      setGameInfo(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return gameInfo ? <GamePage {...gameInfo} /> : <Loader />;
};
