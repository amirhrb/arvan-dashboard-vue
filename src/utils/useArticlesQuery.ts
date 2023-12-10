import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'

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
const useArticlesQuery = (page: number, limit: number) => {
  // All articles Query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(page, limit)
  })

  return { isPending, isError, data, error }
}

export default useArticlesQuery
