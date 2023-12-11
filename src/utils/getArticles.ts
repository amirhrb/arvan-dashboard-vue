import axios from 'axios'

// fn
import handleLocalStorage from './handleLocalStorage'

// base path
const API_URL = import.meta.env.VITE_API_URL

export const getArticles = async (page: number, limit: number) => {
  const offset = (page - 1) * limit
  const token = handleLocalStorage('token')
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  return axios
    .get(`${API_URL}/articles?offset=${offset}&limit=${limit}`, {
      headers
    })
    .then((res) => res)
    .catch((error) => error)
}
