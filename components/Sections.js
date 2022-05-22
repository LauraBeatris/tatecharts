import { HStack, VStack } from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from './Typography'

export function LastSingleStreams () {
  return (
    <HStack width='100%' as='section'>
      <VStack
        spacing='-1'
        alignItems='flex-start'
      >
        <SectionTitle>last single streams</SectionTitle>
        <SectionDescription>
          click to listen on respective services
        </SectionDescription>
      </VStack>
    </HStack>
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
