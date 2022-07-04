import { authInstance } from 'api';
import axios from 'axios';

export const fetchUserInfo = (id?: string) => {
  return authInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/user/${id}`);
};

export const uploadUserPhoto = async (formData: FormData, id?: string) => {
  const { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/game-shop/image/upload',
    formData,
  );
  return await authInstance.put(`https://outcst-game-shop-server.herokuapp.com/api/user/${id}`, {
    photo: data.url,
  });
};
