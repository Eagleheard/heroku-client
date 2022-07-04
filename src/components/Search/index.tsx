import { Autocomplete } from 'components/Autocomplete';
import React from 'react';
import { Card } from 'screen';
import { IGame } from 'types/interfaces';

import './styles.scss';

interface ISearch {
  games: IGame[];
  onChangeSearch: (value: string) => void;
  reset?: string;
}

export const Search: React.FC<ISearch> = ({ games, onChangeSearch, reset }) => {
  return (
    <div className="search">
      <Autocomplete
        options={games.map(({ name }) => name)}
        name="Search games"
        onChangeInput={onChangeSearch}
        reset={reset}
      >
        {games.map((game) => (
          <Card search key={game.id} {...game} />
        ))}
      </Autocomplete>
    </div>
  );
};
