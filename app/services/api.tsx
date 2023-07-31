import axios from 'axios';

const apiPlaylist = axios.create({
  baseURL: 'https://tiao.supliu.com.br/api/',
});

apiPlaylist.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'dev.emersonrodrigues@outlook.com';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getAlbum = async (url: string) => {
  try {
    const response = await apiPlaylist.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getAlbum;