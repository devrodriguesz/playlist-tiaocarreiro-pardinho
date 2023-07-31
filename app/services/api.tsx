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

export const getAlbum = async (url: string) => {
  try {
    const response = await apiPlaylist.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createAlbum = async (name: string, year: string) => {
  try {
    const response = await apiPlaylist.post('album', { name, year });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteAlbum = async (id: number) => {
  try {
    const response = await apiPlaylist.delete(`album/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTrack = async (albumId: number, number: number, title: string, duration: number) => {
  try {
    const response = await apiPlaylist.post('/track', {
      album_id: albumId,
      number: number,
      title: title,
      duration: duration,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTrack = async (id: number) => {
  try {
    const response = await apiPlaylist.delete(`track/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};