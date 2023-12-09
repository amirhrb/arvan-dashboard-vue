import axios from 'axios'
// fn
import handleLocalStorage from './handleLocalStorage'

const API_URL = import.meta.env.VITE_API_URL

const loginHandler = async ({ email, password }: { email: string; password: string }) => {
  const data = JSON.stringify({
    user: {
      email,
      password
    }
  })
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
  const userData = await axios
    .post(`${API_URL}/users/login`, data, { headers })
    .then(({ data }) => {
      if (data.user) handleLocalStorage('token', data.user.token)
      return { data, status: 'success', message: 'Login successfuly' }
    })
    .catch((error) => {
      if (error.response.status === 403) {
        return { status: 'failed', message: 'Login Failed! User name and/or Password is invalid' }
      } else {
        return { status: 'failed', message: 'An error accured in login process' }
      }
    })
  return userData
}
export default loginHandler
