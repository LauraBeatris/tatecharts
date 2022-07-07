import { numberWithDots } from 'components/Tables'

const { default: axios } = require('axios')
const { twitterClient, giphyClient } = require('config/client')

const downloadFile = async (url) => {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data))
}

export const postTrackDataTweets = async ({ trackData }) => {
  const currentDate = new Date()
  const tweetDate = `0${currentDate.getDate()}.0${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`

  const promises = trackData.map(async ({ trackInfo, stats }) => {
    const gifResponse = await giphyClient.random({ tag: 'tate mcrae' })
    const gifFile = await downloadFile(gifResponse.data.images.original.url)
    const mediaId = await twitterClient.v1.uploadMedia(gifFile, { mimeType: 'image/gif' })

    return twitterClient.v2.tweet(
          `
#iusedtothinkicouldfly @tatemcrae daily streaming stats ${tweetDate} from tatecharts.com ✈️

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
