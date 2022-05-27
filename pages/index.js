import { VStack } from '@chakra-ui/react'
import { ScreenLayout } from 'components/Layout'
import { TechnicalIssuesModal } from 'components/Modals'
import { AlbumCharts } from 'components/Sections/AlbumCharts'
import { TracksCharts } from 'components/Sections/TracksCharts'
import { TracksStats } from 'components/Sections/TracksStats'
import { Seo } from 'components/Seo'

export default function Home () {
  return (
    <>
      <Seo />
      <ScreenLayout>
        <VStack paddingTop='5'>
          <TechnicalIssuesModal />
          <AlbumCharts />
          <TracksStats />
          <TracksCharts />
        </VStack>
      </ScreenLayout>
    </>
  )
}
