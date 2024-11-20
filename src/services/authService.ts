import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post('/auth/register', {
      name,
      email,
      password,
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', {
    email,
    password,
  })

  if (response.data.message) {
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    return true
  } else {
    return false
  }
}

export const logout = async () => {
  try {
    const response = await axios.delete('/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (response.data.message) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return response.data
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

export const forgotPassword = (email: string) => {
  return axios.post('/auth/forgot-password', { email })
}
