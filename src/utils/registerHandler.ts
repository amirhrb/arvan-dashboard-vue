import axios from 'axios'
// fn
import handleLocalStorage from './handleLocalStorage'

const API_URL = import.meta.env.VITE_API_URL

const registerHandler = async ({
  email,
  password,
  username
}: {
  email: string
  password: string
  username: string
}) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
  const body = JSON.stringify({
    user: {
      email,
      password,
      username
    }
  })

  const userData = await axios
    .post(`${API_URL}/users`, body, { headers })
    .then(({ data }) => {
      if (data.user) handleLocalStorage('token', data.user.token)
      return { data, status: 'success', message: 'Login successfuly' }
    })
    .catch((error) => {
      // console.log(error.response.data.errors)
      const errorMessage = error.response.data.errors.email
        ? `email ${error.response.data.errors.email[0]}`
        : error.response.data.errors.username
          ? `username ${error.response.data.errors.username[0]}`
          : 'An error accured in registration'
      return { status: 'failed', message: errorMessage }
    })

  return userData
}
export default registerHandler
