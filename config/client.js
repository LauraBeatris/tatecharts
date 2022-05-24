import axios from 'axios'

export const songStatsClient = axios.create({
  baseURL: process.env.SONGSTATS_API_ENDPOINT,
  headers: {
    apiKey: process.env.SONGSTATS_API_KEY
  }
})
