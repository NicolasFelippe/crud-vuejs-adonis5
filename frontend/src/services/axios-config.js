import axios from 'axios'

const IP = process.env.NODE_ENV === 'production' ? 'https://servidor' : 'http://localhost'
const BASE = `${IP}:3333/`

export const instance = axios.create({
  baseURL: BASE,
  timeout: 30000,
  validateStatus: (status) => {
    return status <= 500
  }
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  }
)

export default { instance }
