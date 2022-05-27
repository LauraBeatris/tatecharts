import {
  Link as ChakraLink,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import axios from 'axios'
import { ScreenLayout } from 'components/Layout'
import { Seo } from 'components/Seo'
import { ArrowBackIcon } from '@chakra-ui/icons'

const cheerio = require('cheerio')
const mapServicesName = {
  appleMusic: 'Apple Music',
  iTunes: 'iTunes'
}

function transformChartsListByService (chartsResults, serviceName) {
  return chartsResults.filter((result) => !result.includes(mapServicesName[serviceName])).filter((el, index, array) => array.indexOf(el) === index)
}

export async function getStaticProps () {
  const { data } = await axios.get('https://kworb.net/itunes/artist/tatemcrae.html')
  const $ = cheerio.load(data)
  const appleMusicCharts = $("td:contains('Album: i used to think i could fly') .app")
  const iTunesCharts = $("td:contains('Album: i used to think i could fly') .itu")

  const appleMusicResults = []
  $(appleMusicCharts).each((_idx, el) => {
    appleMusicResults.push($(el).text())
  })

  const iTunesResults = []
  $(iTunesCharts).each((_idx, el) => {
    iTunesResults.push($(el).text())
  })

  return {
    props: {
      charts: {
        iTunes: transformChartsListByService(iTunesResults, 'iTunes'),
        appleMusic: transformChartsListByService(appleMusicResults, 'appleMusic')
      }
    },
    /**
     * Re-generate page once every 10 seconds
     * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
     * */
    revalidate: 10
  }
}

function ChartsList ({ serviceName, charts }) {
  return (
    <VStack
      width='100%'
      maxHeight='25vh'
      borderRadius='12px'
      overflow='scroll'
      paddingBottom='4'
      backgroundColor='tableBg'
    >
      <Flex
        as='header'
        top='0'
        width='100%'
        position='sticky'
        paddingTop='2'
        justifyContent='center'
        backgroundColor='inherit'
      >
        <Text
          bgClip='text'
          bgGradient='linear(to-l, pink.500, pink.600)'
          fontSize='20px'
          fontWeight='extrabold'
        >
          {serviceName}
        </Text>
      </Flex>
      <UnorderedList>
        {charts.map((result) => (
          <ListItem color='black' key={result}>{result}</ListItem>
        ))}
      </UnorderedList>
    </VStack>
  )
}

export default function AlbumCharts ({ charts }) {
  return (
    <>
      <Seo />
      <ScreenLayout>
        <VStack width='100%' flex='1' as='section'>
          <ChakraLink
            as={Link}
            variant='unstyled'
            href='/'
            height='unset'
            borderRadius='0'
          >
            <Text
              color='grayLight'
              cursor='pointer'
              textAlign='center'
              wordWrap='break-word'
              whiteSpace='normal'
              textDecoration='underline'
            >
              <ArrowBackIcon />  click here to go back to tracks stats dashboard
            </Text>
          </ChakraLink>

          <ChartsList serviceName='iTunes' charts={charts.iTunes} />
          <ChartsList serviceName='Apple Music' charts={charts.appleMusic} />
        </VStack>
      </ScreenLayout>
    </>
  )
}
