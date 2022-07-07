import axios from 'axios'
import Twitter from 'twitter-api-v2'
import { GiphyFetch } from '@giphy/js-fetch-api'

export const songStatsClient = axios.create({
  baseURL: process.env.SONGSTATS_API_ENDPOINT,
  headers: {
    apiKey: process.env.SONGSTATS_API_KEY
  }
})

export const twitterClient = new Twitter({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_BEARER_TOKEN,
  accessSecret: process.env.TWITTER_TOKEN_SECRET
})

export const giphyClient = new GiphyFetch(process.env.GIPHY_API_KEY)
