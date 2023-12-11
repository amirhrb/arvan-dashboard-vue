import axios from 'axios'

// fn
import handleLocalStorage from './handleLocalStorage'
import type { CreateArticleDataTypes } from '@/types'

// base path
const API_URL = import.meta.env.VITE_API_URL

// edit article by slug
export const editArticle = async ({
  slug,
  data
}: {
  slug: string
  data: CreateArticleDataTypes
}) => {
  const token = handleLocalStorage('token')
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  return axios
    .put(`${API_URL}/articles/${slug}`, JSON.stringify(data), { headers })
    .then((res) => res)
    .catch((error) => error)
}
