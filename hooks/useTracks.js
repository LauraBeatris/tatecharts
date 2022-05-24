import axios from 'axios'
import { mapSongsISRC } from 'isrc'
import { useQuery } from 'react-query'

function getTrack ({ isrc }) {
  return axios.get('/api/track', { params: { isrc } }).then(res => res.data)
}

export function useTracks () {
  const {
    data: track1,
    isLoading: isLoadingTrack1
  } = useQuery(`track-${mapSongsISRC['what-would-you-do']}`, () =>
    getTrack({ isrc: mapSongsISRC['what-would-you-do'] })
  )
  const {
    data: track2,
    isLoading: isLoadingTrack2
  } = useQuery(`track${mapSongsISRC.chaotic}`, () =>
    getTrack({ isrc: mapSongsISRC.chaotic })
  )
  const {
    data: track3,
    isLoading: isLoadingTrack3
  } = useQuery(`track${mapSongsISRC['feel-like-shit']}`, () =>
    getTrack({ isrc: mapSongsISRC['feel-like-shit'] })
  )
  const {
    data: track4,
    isLoading: isLoadingTrack4
  } = useQuery(`track${mapSongsISRC['she-is-all-i-wanna-be']}`, () =>
    getTrack({ isrc: mapSongsISRC['she-is-all-i-wanna-be'] })
  )

  return {
    isLoading: (
      isLoadingTrack1 || isLoadingTrack2 ||
      isLoadingTrack3 || isLoadingTrack4
    ),
    tracks: [track1, track2, track3, track4]
  }
}
