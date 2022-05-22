import Image from 'next/image'
import { Flex, HStack, VStack } from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from './Typography'
import { LastSingleStreamsTable } from './Tables'

export function LastSingleStreams () {
  return (
    <VStack as='section' alignItems='flex-start'>
      <HStack width='100%'>
        <VStack
          spacing='-1'
          alignItems='flex-start'
        >
          <SectionTitle>last single streams</SectionTitle>
          <SectionDescription>
            click to listen on respective services
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
        spacing='-1'
        alignItems='flex-start'
      >
        <SectionTitle>
          album streams per platform
        </SectionTitle>
        <SectionDescription>
          click to see per individual track
        </SectionDescription>

      </VStack>
    </HStack>
  )
}

export function AlbumCharts () {
  return (
    <HStack width='100%' as='section'>
      <VStack
        spacing='-1'
        alignItems='flex-start'
      >
        <SectionTitle>album charts</SectionTitle>
        <SectionDescription>
          by default showing global charts, select above an specific country
        </SectionDescription>
      </VStack>
    </HStack>
  )
}
