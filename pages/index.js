import { VStack } from '@chakra-ui/react'
import { ScreenLayout } from 'components/Layout'
import { AlbumCharts, TracksCharts, TracksStats } from 'components/Sections'
import { Seo } from 'components/Seo'

export default function Home () {
  return (
    <>
      <Seo />
      <ScreenLayout>
        <VStack paddingTop='5'>
          <AlbumCharts />
          <TracksStats />
          <TracksCharts />
        </VStack>
      </ScreenLayout>
    </>
  )
}
