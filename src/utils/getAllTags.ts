import axios from 'axios'

// base path
const API_URL = import.meta.env.VITE_API_URL

export const getAllTags = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
  return await axios
    .get(`${API_URL}/tags`, { headers })
    .then((res) => res)
    .catch((error) => error)
}

export default getAllTags
