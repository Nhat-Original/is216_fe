import axios from 'axios'

export const locationApi = axios.create({
  baseURL: 'https://vapi.vnappmob.com/api/',
})
