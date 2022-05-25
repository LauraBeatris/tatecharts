import { VStack } from '@chakra-ui/react'
import { ScreenLayout } from 'components/Layout'
import { TracksCharts, TracksStats } from 'components/Sections'
import { Seo } from 'components/Seo'

export default function Home () {
  return (
    <>
      <Seo />
      <ScreenLayout>
        <VStack paddingTop='5'>
          <TracksStats />
          <TracksCharts />
        </VStack>
      </ScreenLayout>
    </>
  )
}
