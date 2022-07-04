import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import '../../../../jest.env';
import { fetchGame, fetchGameComments } from 'api/fetchGame';
import { authorization } from 'api/authorization';
import { GamePageContainer } from './container';
import { TestComponent } from 'components/Testing';

jest.mock('api/fetchGame');
jest.mock('api/fetchGame');
jest.mock('api/authorization');
const renderComponent = () =>
  render(
    <TestComponent>
      <GamePageContainer />
    </TestComponent>,
  );

const game = {
  data: {
    id: 2,
    name: 'The last of us: Part 1',
    price: 50,
    digital: false,
    disk: true,
    count: 3,
    popularity: 89,
    image:
      'https://res.cloudinary.com/game-shop/image/upload/v1646244760/The_Last_of_Us_Cover_wujlor.jpg',
    isNew: null,
    isPreview: true,
    preview:
      'https://res.cloudinary.com/game-shop/image/upload/v1646247573/10a035ad773ee214_1920xH_bp8qab.jpg',
    description:
      'The Last of Us is a 2013 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. Players control Joel, a smuggler tasked with escorting a teenage girl, Ellie, across a post-apocalyptic United States.',
    genreId: 1,
    authorId: 4,
    discountId: null,
    genre: {
      id: 1,
      name: 'Action',
    },
    author: {
      id: 4,
      name: 'Naughty Dogs',
      image: 'https://res.cloudinary.com/game-shop/image/upload/v1646320511/image1-22_xpvypb.jpg',
      location: 'Santa Monica, California, US',
      description:
        'Naughty Dog, LLC (formerly JAM Software, Inc.) is an American first-party video game developer based in Santa Monica, California. Founded by Andy Gavin and Jason Rubin in 1984.',
      popularity: 89,
    },
    discount: null,
  },
};

const gameComments = {
  data: {
    count: 1,
    rows: [
      {
        id: 1,
        comment: '123',
        gameId: 1,
        userId: 1,
        user: {
          id: 1,
          name: 'Vlad',
          photo:
            'http://res.cloudinary.com/game-shop/image/upload/v1652685563/jdrsuc2gvaeorx5u5ayx.png',
          lastName: 'Krutikov',
        },
      },
    ],
  },
};

const user = {
  data: {
    name: 'Test',
    lastName: 'Test',
  },
};

describe('Game Page', () => {
  it('Should render game page with selected game', async () => {
    fetchGame.mockResolvedValueOnce(game);
    fetchGameComments.mockResolvedValueOnce(gameComments);
    authorization.mockResolvedValueOnce(user);
    const { getByTestId, findByTestId } = renderComponent();
    expect(await findByTestId('loader')).not.toBeInTheDocument();
    expect(await findByTestId('gamePage')).toBeInTheDocument();
    expect(getByTestId('gameName')).toHaveTextContent('The last of us: Part 1');
  });

  it('Should render count and change it if clicked increase or decrease button', async () => {
    fetchGame.mockResolvedValueOnce(game);
    fetchGameComments.mockResolvedValueOnce(gameComments);
    authorization.mockResolvedValueOnce(user);
    const { getByText, getByTestId, findByTestId } = renderComponent();
    expect(await findByTestId('loader')).not.toBeInTheDocument();
    expect(await findByTestId('gamePage')).toBeInTheDocument();
    const decreaseBtn = getByText('-');
    const increaseBtn = getByText('+');
    expect(getByTestId('gameName')).toHaveTextContent('The last of us: Part 1');
    expect(getByTestId('gameCount')).toHaveTextContent('1');
    expect(decreaseBtn).toBeDisabled();
    userEvent.click(increaseBtn);
    userEvent.click(increaseBtn);
    await waitFor(() => expect(increaseBtn).toBeDisabled());
    expect(decreaseBtn).not.toBeDisabled();
  });
});
