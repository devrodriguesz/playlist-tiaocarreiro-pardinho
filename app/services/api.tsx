import axios, { AxiosInstance } from 'axios';

const apiPlaylist = axios.create({
  baseURL: 'https://tiao.supliu.com.br/api/',
});

const AUTHORIZATION_HEADER= "dev.emersonrodrigues@outlook.com"

const setAuthorization = (config: any ) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: AUTHORIZATION_HEADER,
    }
  }
}

apiPlaylist.interceptors.request.use(setAuthorization, Promise.reject)

export const getAlbum = async (url: string) => {
  try {
    const response = await apiPlaylist.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createAlbum = async (name: string, year: string): Promise<Album | null> => {
  try {
    const response = await apiPlaylist.post<ApiResponse<Album>>('album', { name, year });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteAlbum = async (id: number): Promise<void> => {
  try {
    await apiPlaylist.delete(`album/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const createTrack = async (trackData: {
  albumId: number;
  number: number;
  title: string;
  duration: number;
}): Promise<Track | null> => {
  try {
    const response = await apiPlaylist.post<ApiResponse<Track>>('/track', trackData);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTrack = async (id: number): Promise<void> => {
  try {
    await apiPlaylist.delete(`track/${id}`);
  } catch (error) {
    console.error(error);
  }
};