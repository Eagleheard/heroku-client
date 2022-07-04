export interface IGame {
  id: number;
  name: string;
  genre: {
    name: string;
    id: number;
  };
  author: {
    name: string;
    id: number;
    location: string;
    description: string;
    popularity: number;
  };
  price: number;
  image?: string;
  preview?: string;
  isPreview?: boolean;
  new?: boolean;
  popularity?: number;
  description?: string;
  purchaseDate?: string;
  quantity?: number;
  disk?: boolean;
  count: number;
  isCart?: boolean;
  order?: boolean;
  discount?: {
    discountCount: string;
  };
  search?: boolean;
  comment: string;
  user: {
    name: string;
    lastName: string;
    photo: string;
  };
  formatedCreatedAt?: string;
}

export interface IAuthor {
  id: number;
  name: string;
  location?: string;
  popularity?: number;
  description?: string;
  logo?: string;
}

export interface IParams {
  authorName?: string;
  genreName?: string;
  digital?: boolean;
  disk?: boolean;
  minPrice: string;
  maxPrice: string;
  count?: number;
  isNew?: boolean;
}

export interface ICart {
  cart: {};
  game: IGame;
  quantity: number;
}

export interface ISign {
  handleSwitch: () => void;
  style?: string;
}

export interface IUser {
  id?: string;
  email?: string;
  name?: string;
  lastName?: string;
  password?: string;
  photo?: string;
  role?: string;
  blocked?: boolean;
  token?: string;
}

export interface IUserParams {
  id?: string;
  blocked?: boolean;
}

export interface ICommentParams {
  id: number;
  comment: string;
}

export interface IAchievement {
  id?: number;
  isAchieved?: boolean;
  name: string;
  description: string;
  discount: number;
  achievementId: number;
  achievement: {
    id: number;
    name: string;
    description: string;
    discount: number;
  };
}

export interface IOrder {
  id?: number;
  name?: string;
  email?: string;
  quantity?: string;
  game?: IGame;
  formatedCreatedAt?: string;
}

export interface IOrderParams {
  order?: string;
}

export interface INewGameParams {
  id?: number;
  name?: string;
  price?: string;
  count?: string;
  image?: string;
  authorName?: string;
  genreName?: string;
  disk?: boolean;
  digital?: boolean;
  popularity?: string;
  isPreview?: boolean;
  preview?: string;
  isNew?: boolean;
  description?: string;
}

export interface INewAuthorParams {
  id?: number;
  name?: string;
  image?: string;
  description?: string;
  popularity?: string;
  location?: string;
}

export interface IDiscountParams {
  startDiscount?: string;
  endDiscount?: string;
  gameName?: string;
}

export interface IGameComments {
  id: number;
  comment: string;
  user: {
    name: string;
    lastName: string;
    photo: string;
  };
}
