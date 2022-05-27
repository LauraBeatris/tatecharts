import { withSentry } from '@sentry/nextjs'
import axios from 'axios'

const cheerio = require('cheerio')

const mapServicesValue = {
  appleMusic: 'Apple Music'
}

async function handler (req, res) {
  const { data } = await axios.get('https://kworb.net/itunes/artist/tatemcrae.html')
  const $ = cheerio.load(data)
  const albumCharts = $("td:contains('Album: i used to think i could fly') .app")

  const results = []
  $(albumCharts).each((_idx, el) => {
    results.push($(el).text())
  })
  const charts = results.filter((result) => !result.includes(mapServicesValue.appleMusic)).filter((el, index, array) => array.indexOf(el) === index)

  return res.status(200).json([{
    service: mapServicesValue.appleMusic,
    charts
  }])
}

export default withSentry(handler)
