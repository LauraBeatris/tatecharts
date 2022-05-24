import { VStack } from '@chakra-ui/react'
import { ScreenLayout } from 'components/Layout'
import { TracksCharts, TracksStats } from 'components/Sections'

export default function Home () {
  return (
    <ScreenLayout>
      <VStack paddingTop='5'>
        <TracksStats />
        <TracksCharts />
      </VStack>
    </ScreenLayout>
  )
}
