import Image from 'next/image'
import { Flex, HStack, Select, VStack } from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from './Typography'
import { AlbumChartsTable, AlbumStreamsTable, LastSingleStreamsTable } from './Tables'
import { ChartTargetSelect } from './ChartTargetSelect'

export function LastSingleStreams () {
  return (
    <VStack as='section' alignItems='flex-start'>
      <HStack width='100%' alignItems='flex-end'>
        <VStack
          spacing='-1'
          alignItems='flex-start'
        >
          <SectionTitle>last single streams</SectionTitle>
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

      <LastSingleStreamsTable />
    </VStack>
  )
}

export function AlbumStreams () {
  return (
    <HStack width='100%' as='section'>
      <VStack
        width='100%'
        spacing='-1'
        alignItems='flex-start'
      >
        <SectionTitle>
          album streams per platform
        </SectionTitle>
        <SectionDescription>
          click on each row to listen on the respective platform
        </SectionDescription>

        <Flex width='100%'>
          <AlbumStreamsTable tableContainerProps={{ marginTop: '15px' }} />
        </Flex>
      </VStack>
    </HStack>
  )
}

export function AlbumCharts () {
  return (
    <HStack width='100%' as='section'>
      <VStack
        spacing='-1'
        alignItems='flex-end'
      >
        <HStack alignItems='flex-end'>
          <VStack alignItems='flex-start' spacing='-1'>
            <SectionTitle>album charts</SectionTitle>
            <SectionDescription>
              by default showing global charts, select above for results from a specific country
            </SectionDescription>

          </VStack>

          <ChartTargetSelect />
        </HStack>

        <Flex width='100%'>
          <AlbumChartsTable tableContainerProps={{ marginTop: '15px' }} />
        </Flex>
      </VStack>
    </HStack>
  )
}
