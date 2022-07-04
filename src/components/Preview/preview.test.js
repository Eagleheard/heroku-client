import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import '../../../jest.env';
import { Preview } from 'components';
import { fetchPreviewGames } from 'api/fetchPreviewGames';
import { TestComponent } from 'components/Testing';

const previewGames = {
  count: 3,
  rows: [
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
      id: 5,
      name: 'It Takes Two',
      price: 35,
      digital: true,
      disk: true,
      count: 83,
      popularity: 99,
      image:
        'https://res.cloudinary.com/game-shop/image/upload/v1646244954/0Xqi1LgRoEtJ5zlFprpd54Vu_wy4scf.jpg',
      isNew: null,
      isPreview: true,
      preview:
        'https://res.cloudinary.com/game-shop/image/upload/v1646247742/d10f6f15b7a24e988ea3913d1210fe27_ggjoya.jpg',
      description:
        'It Takes Two is an action-adventure video game with elements from platform games. It is specifically designed for split-screen cooperative multiplayer, which means that it must be played with another player through either local or online play.',
      genreId: 2,
      authorId: 3,
      discountId: null,
      genre: {
        id: 2,
        name: 'Adventure',
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
      <Preview />
    </TestComponent>,
  );

const doAsync = (c) => {
  setTimeout(() => {
    c(true);
  }, 3000);
};

jest.mock('api/fetchPreviewGames');

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
});

describe('Preview', () => {
  it('Should change to next page after 3sec', async () => {
    fetchPreviewGames.mockResolvedValueOnce({ data: { rows: previewGames.rows } });
    act(async () => {
      const { getByTestId, findByText } = renderComponent();
      expect(await findByText('The last of us: Part 1')).toBeVisible();
      jest.advanceTimersByTime(3000);
      const currentPage = 0;
      const nextPreview = expect(getByTestId(`preview-${currentPage + 1}`)).toHaveClass(
        'preview__img preview__img--active',
      );
      doAsync(nextPreview);
      jest.useRealTimers();
    });
  });

  it('Should change to next page after click next button', async () => {
    fetchPreviewGames.mockResolvedValueOnce({ data: { rows: previewGames.rows } });
    act(() => {
      renderComponent();
    });
    const currentPage = 0;
    expect(await screen.findByText('The last of us: Part 1')).toBeVisible();
    const nextBtn = screen.getByTestId('next-btn');
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByTestId(`preview-${currentPage + 1}`)).toHaveClass(
      'preview__img preview__img--active',
    );
  });
});
