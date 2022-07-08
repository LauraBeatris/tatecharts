import { numberWithDots } from 'components/Tables'
import { formatDistance } from 'date-fns'
import { updateTweetsPublishFlag } from './database'

const { default: axios } = require('axios')
const { twitterClient, giphyClient } = require('config/client')

async function downloadFile (url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data))
}

function getTweetDate (date) {
  const day = String(date.getDate())
  const month = String(date.getMonth() + 1)

  return `${day.length === 2 ? day : `0${day}`}.${month.length === 2 ? month : `0${month}`}.${date.getFullYear()}`
}

export async function postTrackDataTweets ({ trackData }) {
  const currentTweetDate = getTweetDate(new Date())

  const promises = trackData.map(async ({ trackInfo, stats }) => {
    const gifResponse = await giphyClient.random({ tag: 'tate mcrae' })
    const gifFile = await downloadFile(gifResponse.data.images.original.url)
    const mediaId = await twitterClient.v1.uploadMedia(gifFile, { mimeType: 'image/gif' })

    return twitterClient.v2.tweet(
          `
#iusedtothinkicouldfly @tatemcrae daily streaming stats ${currentTweetDate} from tatecharts.com ✈️

- track title: ${trackInfo.title.toLowerCase()}
- spotify total streams: ${numberWithDots(stats.spotify.streams_total ?? 0)}
- deezer playlists total: ${numberWithDots(stats.deezer.playlists_total ?? 0)}
- apple music total playlists: ${numberWithDots(stats.appleMusic.playlists_total ?? 0)}
          `,
          {
            media: { media_ids: [mediaId] }
          })
  })

  await Promise.all(promises)
}

export async function postTotalStreamsCountTweet ({ trackData }) {
  const gifResponse = await giphyClient.random({ tag: 'tate mcrae' })
  const gifFile = await downloadFile(gifResponse.data.images.original.url)
  const mediaId = await twitterClient.v1.uploadMedia(gifFile, { mimeType: 'image/gif' })

  const currentTweetDate = getTweetDate(new Date())
  const releaseDateISO = new Date(trackData[0].trackInfo.release_date)
  const formattedReleaseDate = getTweetDate(releaseDateISO)
  const releaseDateDistance = formatDistance(new Date(), releaseDateISO)

  const spotifyStreamsCount = trackData.reduce((acc, { stats }) => stats.spotify.streams_total + acc, 0)

  return twitterClient.v2.tweet(
        `
#iusedtothinkicouldfly @tatemcrae daily streaming stats ${currentTweetDate} from tatecharts.com ✈️

total album @Spotify streams: ${numberWithDots(spotifyStreamsCount)} 💚

it's been ${releaseDateDistance} since the release date ${formattedReleaseDate}
    `,
        {
          media: { media_ids: [mediaId] }
        })
}

/**
 * Publishes tweets once a day with stats and charts updates
 */
export async function publishTweets ({ trackData }) {
  const wasUpdatedToday = await updateTweetsPublishFlag()

  if (wasUpdatedToday) return

  await postTotalStreamsCountTweet({ trackData })
}
