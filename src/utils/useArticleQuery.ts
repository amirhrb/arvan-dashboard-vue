import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'

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
  return axios
    .get(`${API_URL}/articles/${slug}`, {
      headers
    })
    .then((res) => res)
    .catch((error) => error)
}

const useArticleQuery = (slug: string) => {
  const { data, isPending, isError } = useQuery({
    queryFn: () => getArticle(slug),
    queryKey: ['articles', slug]
  })
  return { data, isPending, isError }
}
export default useArticleQuery
