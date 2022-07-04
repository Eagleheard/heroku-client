import React from 'react';

import { Form } from 'components/Form';
import { IGame, IParams } from 'types/interfaces';

import './style.scss';

interface IFilter {
  fillGames: (params?: IParams) => void;
}

export const Filter: React.FC<IFilter> = ({ fillGames }) => {
  return (
    <div className="filter">
      <Form fillGames={fillGames} />
    </div>
  );
};
