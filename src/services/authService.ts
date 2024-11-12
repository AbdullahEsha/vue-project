import axios from './axiosInstance'

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
    fetch('http://localhost:5000/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const forgotPassword = (email: string) => {
  return axios.post('/auth/forgot-password', { email })
}
