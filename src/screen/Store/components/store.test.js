import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import '../../../../jest.env';
import { Store } from '.';
import { fetchGames } from 'api/fetchGames';
import { fetchGenres } from 'api/fetchGenres';
import { TestComponent } from 'components/Testing';

const renderComponent = () =>
  render(
    <TestComponent>
      <Store />
    </TestComponent>,
  );

const games = {
  data: {
    count: 2,
    rows: [
      {
        id: 1,
        name: 'Teamfight Tactics',
        price: 0,
        digital: true,
        disk: false,
        count: null,
        popularity: 77,
        image: 'https://res.cloudinary.com/game-shop/image/upload/v1646244501/tft_dmqgbx.jpg',
        isNew: true,
        isPreview: null,
        preview:
          'https://res.cloudinary.com/game-shop/image/upload/v1647096840/teamfight-tactics-champion-synergies-guide-800x400_he718b.jpg',
        description:
          'Teamfight Tactics (TFT) is an auto battler game developed and published by Riot Games. The game is a spinoff of League of Legends and is based on Dota Auto Chess, where players compete online against seven other opponents by building a team to be the last one standing.',
        genreId: 4,
        authorId: 6,
        discountId: null,
        genre: {
          id: 4,
          name: 'Strategy',
        },
        author: {
          id: 6,
          name: 'Riot Games',
          image: 'https://res.cloudinary.com/game-shop/image/upload/v1646320595/riot_gawusz.png',
          location: 'Los Angeles, US',
          description:
            'Riot Games, Inc. is an American video game developer, publisher and esports tournament organizer. Its headquarters are in West Los Angeles, California.',
          popularity: 85,
        },
        discount: null,
      },
      {
        id: 2,
        name: 'The last of us: Part 1',
        price: 50,
        digital: false,
        disk: true,
        count: 100,
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
          image:
            'https://res.cloudinary.com/game-shop/image/upload/v1646320511/image1-22_xpvypb.jpg',
          location: 'Santa Monica, California, US',
          description:
            'Naughty Dog, LLC (formerly JAM Software, Inc.) is an American first-party video game developer based in Santa Monica, California. Founded by Andy Gavin and Jason Rubin in 1984.',
          popularity: 89,
        },
        discount: null,
      },
    ],
  },
};

const genres = {
  data: [
    {
      id: 1,
      name: 'Action',
    },
    {
      id: 2,
      name: 'Adventure',
    },
    {
      id: 3,
      name: 'RPG',
    },
    {
      id: 4,
      name: 'Strategy',
    },
    {
      id: 5,
      name: 'Racing',
    },
  ],
};

jest.mock('api/fetchGames');
jest.mock('api/fetchGenres');

afterEach(cleanup);

describe('Store', () => {
  it('Should render store', async () => {
    fetchGames.mockResolvedValueOnce({ ...games });
    fetchGames.mockResolvedValueOnce({ ...games });
    fetchGenres.mockResolvedValueOnce({ ...genres });
    renderComponent();
    expect(await screen.findByText('Teamfight Tactics')).toBeVisible();
    expect(await screen.findByText('The last of us: Part 1')).toBeVisible();
  });
  it('Should find game by author name', async () => {
    fetchGames.mockResolvedValueOnce(games);
    fetchGames.mockResolvedValueOnce(games);
    fetchGenres.mockResolvedValueOnce({ ...genres });
    const { getByTestId, queryByTestId, getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('Author');
    const submit = getByTestId('search');
    userEvent.type(input, 'Riot Games');
    await waitFor(() => expect(queryByTestId('autocomplete')).toHaveValue('Riot Games'));
    userEvent.click(submit);
    fetchGames.mockResolvedValueOnce({
      data: {
        count: 1,
        rows: [
          {
            id: 1,
            name: 'Teamfight Tactics',
            price: 0,
            digital: true,
            disk: false,
            count: null,
            popularity: 77,
            image: 'https://res.cloudinary.com/game-shop/image/upload/v1646244501/tft_dmqgbx.jpg',
            isNew: true,
            isPreview: null,
            preview:
              'https://res.cloudinary.com/game-shop/image/upload/v1647096840/teamfight-tactics-champion-synergies-guide-800x400_he718b.jpg',
            description:
              'Teamfight Tactics (TFT) is an auto battler game developed and published by Riot Games. The game is a spinoff of League of Legends and is based on Dota Auto Chess, where players compete online against seven other opponents by building a team to be the last one standing.',
            genreId: 4,
            authorId: 6,
            discountId: null,
            genre: {
              id: 4,
              name: 'Strategy',
            },
            author: {
              id: 6,
              name: 'Riot Games',
              image:
                'https://res.cloudinary.com/game-shop/image/upload/v1646320595/riot_gawusz.png',
              location: 'Los Angeles, US',
              description:
                'Riot Games, Inc. is an American video game developer, publisher and esports tournament organizer. Its headquarters are in West Los Angeles, California.',
              popularity: 85,
            },
            discount: null,
          },
        ],
      },
    });
    expect(await screen.findByText('Teamfight Tactics')).toBeVisible();
  });

  it('Should find game by genre', async () => {
    fetchGames.mockResolvedValueOnce(games);
    fetchGames.mockResolvedValueOnce(games);
    fetchGenres.mockResolvedValueOnce(genres);
    const { getByTestId } = renderComponent();
    const genreSelector = getByTestId('Genre');
    userEvent.click(getByTestId('Genre__select__input'));
    expect(genreSelector).toBeVisible();
    await waitFor(() => expect(getByTestId('Strategy')).toBeInTheDocument());
    userEvent.click(getByTestId('Strategy'));
    await waitFor(() => expect(getByTestId('Genre__select__input')).toHaveTextContent('Strategy'));
    const submit = getByTestId('search');
    userEvent.click(submit);
    fetchGames.mockResolvedValueOnce({
      data: {
        count: 1,
        rows: [
          {
            id: 1,
            name: 'Teamfight Tactics',
            price: 0,
            digital: true,
            disk: false,
            count: null,
            popularity: 77,
            image: 'https://res.cloudinary.com/game-shop/image/upload/v1646244501/tft_dmqgbx.jpg',
            isNew: true,
            isPreview: null,
            preview:
              'https://res.cloudinary.com/game-shop/image/upload/v1647096840/teamfight-tactics-champion-synergies-guide-800x400_he718b.jpg',
            description:
              'Teamfight Tactics (TFT) is an auto battler game developed and published by Riot Games. The game is a spinoff of League of Legends and is based on Dota Auto Chess, where players compete online against seven other opponents by building a team to be the last one standing.',
            genreId: 4,
            authorId: 6,
            discountId: null,
            genre: {
              id: 4,
              name: 'Strategy',
            },
            author: {
              id: 6,
              name: 'Riot Games',
              image:
                'https://res.cloudinary.com/game-shop/image/upload/v1646320595/riot_gawusz.png',
              location: 'Los Angeles, US',
              description:
                'Riot Games, Inc. is an American video game developer, publisher and esports tournament organizer. Its headquarters are in West Los Angeles, California.',
              popularity: 85,
            },
            discount: null,
          },
        ],
      },
    });
    expect(await screen.findByText('Teamfight Tactics')).toBeVisible();
  });

  it('Should show game by its type', async () => {
    fetchGames.mockResolvedValueOnce(games);
    fetchGames.mockResolvedValueOnce(games);
    fetchGenres.mockResolvedValueOnce({ ...genres });
    const { getByTestId } = renderComponent();
    const digitalCheckbox = getByTestId('Digital');
    const submit = getByTestId('search');
    userEvent.click(digitalCheckbox);
    userEvent.click(submit);
    fetchGames.mockResolvedValueOnce({
      data: {
        count: 1,
        rows: [
          {
            id: 1,
            name: 'Teamfight Tactics',
            price: 0,
            digital: true,
            disk: false,
            count: null,
            popularity: 77,
            image: 'https://res.cloudinary.com/game-shop/image/upload/v1646244501/tft_dmqgbx.jpg',
            isNew: true,
            isPreview: null,
            preview:
              'https://res.cloudinary.com/game-shop/image/upload/v1647096840/teamfight-tactics-champion-synergies-guide-800x400_he718b.jpg',
            description:
              'Teamfight Tactics (TFT) is an auto battler game developed and published by Riot Games. The game is a spinoff of League of Legends and is based on Dota Auto Chess, where players compete online against seven other opponents by building a team to be the last one standing.',
            genreId: 4,
            authorId: 6,
            discountId: null,
            genre: {
              id: 4,
              name: 'Strategy',
            },
            author: {
              id: 6,
              name: 'Riot Games',
              image:
                'https://res.cloudinary.com/game-shop/image/upload/v1646320595/riot_gawusz.png',
              location: 'Los Angeles, US',
              description:
                'Riot Games, Inc. is an American video game developer, publisher and esports tournament organizer. Its headquarters are in West Los Angeles, California.',
              popularity: 85,
            },
            discount: null,
          },
        ],
      },
    });
    expect(await screen.findByText('Teamfight Tactics')).toBeVisible();
  });

  it('Should clean filter form after click Clean button', async () => {
    fetchGames.mockResolvedValueOnce(games);
    fetchGames.mockResolvedValueOnce(games);
    fetchGenres.mockResolvedValueOnce({ ...genres });
    const { getByTestId, getByPlaceholderText, findByTestId } = renderComponent();
    const digitalCheckbox = getByTestId('Digital');
    const genreSelector = getByTestId('Genre');
    const input = getByPlaceholderText('Author');
    const clearBtn = getByTestId('clear');
    userEvent.click(getByTestId('Genre__select__input'));
    expect(genreSelector).toBeVisible();
    await waitFor(() => expect(getByTestId('Strategy')).toBeInTheDocument());
    userEvent.click(getByTestId('Strategy'));
    await waitFor(() => expect(getByTestId('Genre__select__input')).toHaveTextContent('Strategy'));
    userEvent.type(input, 'Riot Games');
    await waitFor(() => expect(getByTestId('autocomplete')).toHaveValue('Riot Games'));
    userEvent.click(getByTestId('suggest'));
    userEvent.click(digitalCheckbox);
    fetchGames.mockResolvedValueOnce(games);
    userEvent.click(clearBtn);
    expect(await findByTestId('Genre__select__input')).toHaveTextContent('Genre↓');
    expect(await findByTestId('autocomplete')).toHaveValue('');
    expect(await findByTestId('Digital')).not.toBeChecked();
  });
});
