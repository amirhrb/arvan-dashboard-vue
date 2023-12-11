import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'
import handleLocalStorage from './handleLocalStorage'

const API_URL = import.meta.env.VITE_API_URL

const getUser = () => {
  const token = handleLocalStorage('token')
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${token}`
  }
  return axios
    .get(`${API_URL}/user`, { headers })
    .then(({ data }) => {
      if (data.user) handleLocalStorage('token', data.user.token)
      return data
    })
    .catch((err) => {
      return err
    })
}
const useUserData = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })

  return { isPending, isError, data, error }
}
export default useUserData
