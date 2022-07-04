import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { fetchGames } from 'api/fetchGames';
import { Pagination } from '.';
import { Card } from 'screen';
import { TestComponent } from 'components/Testing';

const dataLimit = 4;
let currentPage = 1;

beforeEach(cleanup);
afterEach(cleanup);

jest.mock('api/fetchGames');

const games = {
  count: 6,
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
        image: 'https://res.cloudinary.com/game-shop/image/upload/v1646320511/image1-22_xpvypb.jpg',
        location: 'Santa Monica, California, US',
        description:
          'Naughty Dog, LLC (formerly JAM Software, Inc.) is an American first-party video game developer based in Santa Monica, California. Founded by Andy Gavin and Jason Rubin in 1984.',
        popularity: 89,
      },
      discount: null,
    },
    {
      id: 3,
      name: 'Death Stranding',
      price: 45,
      digital: false,
      disk: true,
      count: 94,
      popularity: 96,
      image:
        'https://res.cloudinary.com/game-shop/image/upload/v1646244840/800px-Death_Stranding_Poster_lbnqfx.jpg',
      isNew: true,
      isPreview: true,
      preview:
        'https://res.cloudinary.com/game-shop/image/upload/v1646247637/1000x600-cvr-0811-3_vfc2z3.png',
      description:
        'The game is set in the United States following a cataclysmic event which caused destructive creatures to begin roaming the Earth. Players control Sam Porter Bridges, a courier tasked with delivering supplies to isolated colonies and reconnecting them via a wireless communications network.',
      genreId: 2,
      authorId: 5,
      discountId: null,
      genre: {
        id: 2,
        name: 'Adventure',
      },
      author: {
        id: 5,
        name: 'Kojima Prod.',
        image:
          'https://res.cloudinary.com/game-shop/image/upload/v1646320547/Kojima_Productions_Logo_wd6aro.png',
        location: 'Shinagawa, Tokyo, Japan',
        description:
          'Kojima Productions Co., Ltd. is a Japanese video game development studio founded in 2005 by video game designer Hideo Kojima, creator of the Metal Gear series.',
        popularity: 93,
      },
      discount: null,
    },
    {
      id: 4,
      name: 'Need For Speed',
      price: 20,
      digital: true,
      disk: false,
      count: null,
      popularity: 56,
      image:
        'https://res.cloudinary.com/game-shop/image/upload/v1646244890/rSQLAhoVFSiUxztL0k4qGBfuRhcJDAXxCFQWiWLUuIfSBMgIm9JgF6cRgmUZrjVHunziZh-l3nWIca2X0fK-38k_uvljpy.png',
      isNew: null,
      isPreview: null,
      preview:
        'https://res.cloudinary.com/game-shop/image/upload/v1647096901/maxresdefault_glhmtl.jpg',
      description:
        'The series generally centers around illicit street racing and tasks players to complete various types of races while evading the local law enforcement in police pursuits.',
      genreId: 5,
      authorId: 3,
      discountId: null,
      genre: {
        id: 5,
        name: 'Racing',
      },
      author: {
        id: 3,
        name: 'Electronic Arts',
        image:
          'https://res.cloudinary.com/game-shop/image/upload/v1646320375/october-ea-ring_axw0ra.png',
        location: 'Redwood City, California, US',
        description:
          'Electronic Arts Inc. (EA) is an American video game company headquartered in Redwood City, California. It is the second-largest gaming company in the Americas and Europe.',
        popularity: 66,
      },
      discount: null,
    },
  ],
};

const renderComponent = () =>
  render(
    <TestComponent>
      <Pagination
        RenderComponent={Card}
        getPaginatedData={games.rows}
        currentPage={currentPage}
        totalCount={games.count}
        pageSize={dataLimit}
        onPageChange={(page) => (currentPage = page)}
      />
    </TestComponent>,
  );
describe('Pagination', () => {
  const { getByText, getByTestId } = renderComponent();
  it('Should change to next page after click next page arrow', async () => {
    fetchGames.mockResolvedValueOnce({ data: { ...games } });
    renderComponent();
    const nextBtn = getByText('»');
    const prevBtn = getByText('«');
    expect(prevBtn).toBeDisabled();
    fireEvent.click(nextBtn);
    waitFor(() => {
      expect(prevBtn).not.toBeDisabled();
      expect(nextBtn).toBeDisabled();
    });
  });
  it('Should change to next page after click page №2', async () => {
    fetchGames.mockResolvedValueOnce({ data: { ...games } });
    renderComponent();
    const prevBtn = getByText('«');
    fireEvent.click(prevBtn);
    waitFor(() => {
      expect(prevBtn).toBeDisabled();
      expect(getByTestId('page-1')).toHaveClass('pagination__btn--active');
    });
    fireEvent.click(getByTestId('page-2'));
    waitFor(() => {
      expect(getByTestId('page-1')).not.toHaveClass('pagination__btn--active');
      expect(getByTestId('page-2')).toHaveClass('pagination__btn--active');
    });
  });
});
