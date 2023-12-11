import axios from 'axios'

// fn
import handleLocalStorage from './handleLocalStorage'
import type { CreateArticleDataTypes } from '@/types'

// base path
const API_URL = import.meta.env.VITE_API_URL

// post an article
export const postArticle = async (data: CreateArticleDataTypes) => {
  const token = handleLocalStorage('token')
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  return axios
    .post(`${API_URL}/articles`, JSON.stringify(data), { headers })
    .then((res) => res)
    .catch((error) => error)
}
