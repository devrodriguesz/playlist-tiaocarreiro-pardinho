import axios from 'axios'

const apiPlaylist = axios.create({
  baseURL: 'https://tiao.supliu.com.br/api/',
})

const playlist = async (url: string) => {
  try {
    const response = await apiPlaylist.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default playlist
