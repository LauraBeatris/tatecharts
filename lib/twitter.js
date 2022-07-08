import { numberWithDots } from 'components/Tables'
import { mockSpotifyAudience } from 'constants/songStatsMocks'
import { formatDistance } from 'date-fns'
import { updateTweetsPublishFlag } from './database'

const { default: axios } = require('axios')
const { twitterClient, giphyClient, songStatsClient } = require('config/client')

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

export async function postAudienceTweet () {
  const { data } = await songStatsClient.get('/artists/audience', {
    params: {
      source: 'spotify,apple_music,deezer',
      songstats_artist_id: 'is0xrqo1'
    }
  })

  const currentTweetDate = getTweetDate(new Date())

  const { audience } = data

  const spotifyAudience = audience.find(({ source }) => source === 'spotify')

  // Tweet Spotify Listeners
  const gifResponse1 = await giphyClient.random({ tag: 'tate mcrae' })
  const gifFile1 = await downloadFile(gifResponse1.data.images.original.url)
  const mediaId1 = await twitterClient.v1.uploadMedia(gifFile1, { mimeType: 'image/gif' })

  const spotifyMonthlyAudience = spotifyAudience.data?.monthly_listeners ?? mockSpotifyAudience.data.monthly_listeners
  const totalListenersGlobal = spotifyMonthlyAudience.reduce((acc, item) => acc + item.current_listeners, 0)
  const totalListenersUS = spotifyMonthlyAudience
    .filter(({ country_code: countryCode }) => countryCode === 'US')
    .reduce((acc, item) => acc + item.current_listeners, 0)
  const totalListenersGB = spotifyMonthlyAudience
    .filter(({ country_code: countryCode }) => countryCode === 'GB')
    .reduce((acc, item) => acc + item.current_listeners, 0)
  const totalListenersDE = spotifyMonthlyAudience
    .filter(({ country_code: countryCode }) => countryCode === 'DE')
    .reduce((acc, item) => acc + item.current_listeners, 0)
  const totalListenersBR = spotifyMonthlyAudience
    .filter(({ country_code: countryCode }) => countryCode === 'BR')
    .reduce((acc, item) => acc + item.current_listeners, 0)
  const totalListenersCA = spotifyMonthlyAudience
    .filter(({ country_code: countryCode }) => countryCode === 'CA')
    .reduce((acc, item) => acc + item.current_listeners, 0)
  const totalListenersAU = spotifyMonthlyAudience
    .filter(({ country_code: countryCode }) => countryCode === 'AU')
    .reduce((acc, item) => acc + item.current_listeners, 0)

  const spotifyListenersMainTweet = await twitterClient.v2.tweet(
      `
monthly listeners stats update @spotify @tatemcrae - ${currentTweetDate} from tatecharts.com ✈️💚

- total listeners (all countries): ${numberWithDots(totalListenersGlobal)} 🌎
  `,
      {
        media: { media_ids: [mediaId1] }
      })

  const gifResponse2 = await giphyClient.random({ tag: 'tate mcrae' })
  const gifFile2 = await downloadFile(gifResponse2.data.images.original.url)
  const mediaId2 = await twitterClient.v1.uploadMedia(gifFile2, { mimeType: 'image/gif' })

  await twitterClient.v2.reply(
        `
per country listeners on @spotify

- 🇺🇸: ${numberWithDots(totalListenersUS)}
- 🇦🇺: ${numberWithDots(totalListenersAU)}
- 🇬🇧: ${numberWithDots(totalListenersGB)}
- 🇨🇦: ${numberWithDots(totalListenersCA)}
- 🇧🇷: ${numberWithDots(totalListenersBR)}
- 🇩🇪: ${numberWithDots(totalListenersDE)}
`, spotifyListenersMainTweet.data.id, { media: { media_ids: [mediaId2] } })
}

/**
 * Publishes tweets once a day with stats and charts updates
 */
export async function publishTweets ({ trackData }) {
  const wasUpdatedToday = await updateTweetsPublishFlag()

  if (wasUpdatedToday) return

  await postAudienceTweet()
  await postTotalStreamsCountTweet({ trackData })
}
