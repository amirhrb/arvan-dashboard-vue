import axios from 'axios'
// fn
import handleLocalStorage from './handleLocalStorage'
// types
import { type UserDataTypes } from '@/types'

const API_URL = import.meta.env.VITE_API_URL

const getCurrentUser = async (): Promise<{
  status: 'unauthorized' | 'authorized'
  data?: UserDataTypes
}> => {
  let status: 'unauthorized' | 'authorized' = 'unauthorized'

  const token = handleLocalStorage('token')
  if (!token) {
    return { status: 'unauthorized' }
  }
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  const data = await axios
    .get(`${API_URL}/user`, { headers })
    .then(({ data }) => {
      if (data.user) handleLocalStorage('token', data.user.token)
      status = 'authorized'
      return data
    })
    .catch(() => {
      status = 'unauthorized'
      return
    })
  return { data, status }
}
export default getCurrentUser
