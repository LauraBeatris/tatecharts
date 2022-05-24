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
  const { stats, links, track_info: trackInfo } = data

  return res.status(200).json({
    stats: {
      deezer: stats.find(({ source }) => source === 'deezer').data,
      spotify: stats.find(({ source }) => source === 'spotify').data,
      appleMusic: stats.find(({ source }) => source === 'apple_music').data
    },
    links: {
      deezer: links.find(({ source }) => source === 'deezer'),
      spotify: links.find(({ source }) => source === 'spotify'),
      appleMusic: links.find(({ source }) => source === 'apple_music')
    },
    trackInfo
  })
}
