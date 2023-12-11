import axios from 'axios'

// fn
import handleLocalStorage from './handleLocalStorage'

// base path
const API_URL = import.meta.env.VITE_API_URL

// delete article by slug
const deleteArticle = async (slug: string) => {
  const token = handleLocalStorage('token')
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  return axios
    .delete(`${API_URL}/articles/${slug}`, { headers })
    .then((res) => res)
    .catch((error) => error)
}
export default deleteArticle
