import axios from 'axios'
import { songStatsClient } from 'config/client'

export default async function handler (req, res) {
  const { query: { isrc } } = req
  const { data } = await songStatsClient.get('/tracks/stats', {
    params: {
      isrc,
      source: 'spotify,apple_music,deezer',
      with_links: true,
      with_charts: true,
      with_videos: true,
      with_playlists: true
    }
  })

  const { stats, links } = data
  const spotifyStats = stats.find(({ source }) => source === 'spotify').data
  const spotifyLink = links.find(({ source }) => source === 'spotify')

  const appleMusicLink = links.find(({ source }) => source === 'apple_music')

  const deezerLink = links.find(({ source }) => source === 'deezer')

  return res.status(200).json({
    stats: { spotify: spotifyStats },
    links: {
      spotify: spotifyLink,
      deezer: deezerLink,
      appleMusic: appleMusicLink
    }
  })
}

export function getTrack ({ isrc }) {
  return axios.get('/api/track', { params: { isrc } }).then(res => res.data)
}

export function transformTrackResponse (response) {

}
