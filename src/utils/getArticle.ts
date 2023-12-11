import axios from 'axios'

// fn
import handleLocalStorage from './handleLocalStorage'

// base path
const API_URL = import.meta.env.VITE_API_URL

const getArticle = async (slug: string) => {
  const token = handleLocalStorage('token')
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  return await axios
    .get(`${API_URL}/articles/${slug}`, {
      headers
    })
    .then((res) => res)
    .catch((error) => error)
}
export default getArticle
