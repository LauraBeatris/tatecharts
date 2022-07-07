const { default: axios } = require('axios')
const { twitterClient, giphyClient } = require('config/client')

const downloadFile = async (url) => {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data))
}

export const postTweet = async ({ trackData }) => {
  const currentDate = new Date()
  const tweetDate = `0${currentDate.getDate()}.0${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`

  const gifResponse = await giphyClient.random({ tag: 'tate mcrae' })
  const gifFile = await downloadFile(gifResponse.data.images.original.url)

  twitterClient.v1.uploadMedia(gifFile, { mimeType: 'image/gif' })
    .then((mediaId) => {
      trackData.forEach(({ trackInfo, stats }) => (
        twitterClient.v2.tweet(
    `
#iusedtothinkicouldfly @tatemcrae daily streaming stats ${tweetDate} from tatecharts.com ✈️

- track title: ${trackInfo.title.toLowerCase()}
- spotify total streams: ${stats.spotify.streams_total}
- deezer playlists total: ${stats.deezer.playlists_total}
- apple music total playlists: ${stats.appleMusic.playlists_total}
    `,
    {
      media: { media_ids: [mediaId] }
    })))
    })
}
