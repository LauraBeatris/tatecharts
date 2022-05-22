import Image from 'next/image'
import { Flex, HStack, VStack } from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from './Typography'
import { AlbumStatsTable, AlbumStreamsTable, LastSingleStatsTable } from './Tables'
import { ChartTargetSelect } from './ChartTargetSelect'

export function LastSingleStats () {
  return (
    <VStack as='section' alignItems='flex-start'>
      <HStack width='100%' alignItems='flex-end'>
        <VStack
          spacing='-1'
          alignItems='flex-start'
        >
          <SectionTitle>last single stats</SectionTitle>
          <SectionDescription>
            click on each row to listen on the respective platform
          </SectionDescription>
        </VStack>

        <Flex
          width='182px'
          height='84px'
          alignItems='flex-end'
          position='relative'
        >
          <Image
            alt='WWYD player'
            src='/images/wwyd-player-spotify.png'
            layout='fill'
          />
        </Flex>
      </HStack>

      <ChartTargetSelect />
      <LastSingleStatsTable />
    </VStack>
  )
}

export function AlbumStats () {
  return (
    <VStack width='100%' as='section'>
      <HStack alignItems='flex-end'>
        <VStack alignItems='flex-start' spacing='-1'>
          <SectionTitle>album stats</SectionTitle>
          <SectionDescription>
            by default showing global charts, select above for results from a specific country
          </SectionDescription>
        </VStack>
      </HStack>

      <VStack
        width='100%'
        alignItems='flex-start'
      >
        <ChartTargetSelect />
        <AlbumStreamsTable tableContainerProps={{ marginTop: '15px' }} />
        <AlbumStatsTable tableContainerProps={{ marginTop: '15px' }} />
      </VStack>
    </VStack>
  )
}
