import axios from 'axios'
import { mapSongsISRC } from 'constants/isrc'
import { useQuery } from 'react-query'

function getAlbumCharts () {
  return axios.get('/api/album-charts').then(res => res.data)
}

export function useAlbumCharts () {
  const result = useQuery('album-charts', () =>
    getAlbumCharts({ isrc: mapSongsISRC['what-would-you-do'] })
  )

  return result
}
