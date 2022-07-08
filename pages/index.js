import { VStack } from '@chakra-ui/react'
import { ScreenLayout } from 'components/Layout'
import { AlbumCharts } from 'components/Sections/AlbumCharts'
import { TracksCharts } from 'components/Sections/TracksCharts'
import { TracksStats } from 'components/Sections/TracksStats'
import { Seo } from 'components/Seo'
import { songStatsClient } from 'config/client'
import { mapSongsISRC } from 'constants/isrc'

const isrcs = Object.values(mapSongsISRC)
export async function getStaticProps () {
  const tracksDataRequests = isrcs.map((isrc) => songStatsClient.get('/tracks/stats', {
    params: {
      isrc,
      source: 'spotify,apple_music,deezer',
      with_links: true,
      with_charts: true,
      with_playlists: true
    }
  }).then((res) => res.data))
  const trackDataResponses = await Promise.all(tracksDataRequests).catch(err => console.log({ err }))
  const transformTrackData = trackDataResponses.map(({
    stats, links, track_info: trackInfo
  }) => ({
    stats: {
      deezer: stats.find(({ source }) => source === 'deezer').data,
      spotify: stats.find(({ source }) => source === 'spotify').data,
      appleMusic: stats.find(({ source }) => source === 'apple_music').data
    },
    links: {
      deezer: links?.find(({ source }) => source === 'deezer') ?? '',
      spotify: links?.find(({ source }) => source === 'spotify') ?? '',
      appleMusic: links?.find(({ source }) => source === 'apple_music') ?? ''
    },
    trackInfo
  }))

  // await postTrackDataTweets({ trackData: transformTrackData })
  // await postTotalStreamsCountTweet({ trackData: transformTrackData })

  return {
    props: {
      tracks: transformTrackData
    },
    /**
     * Re-generate page once every 12 hours (half a day) due to SongStats API
     * rate limiting
     * @see https://docs.songstats.com/docs/api/e80265bb8b01b-songstats-api#rate-limiting
     * */
    revalidate: 43200
  }
}

export default function Home ({ tracks }) {
  return (
    <>
      <Seo />
      <ScreenLayout>
        <VStack paddingTop='5'>
          <AlbumCharts />
          <TracksStats tracks={tracks} />
          <TracksCharts tracks={tracks} />
        </VStack>
      </ScreenLayout>
    </>
  )
}
