import Image from 'next/image'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Skeleton,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from '../Typography'
import { TrackStatsTable } from '../Tables'
import { useState } from 'react'

const isUnderMaintenance = process.env.NEXT_PUBLIC_TRACKS_MAINTENANCE
export function SkeletonWithMaintenanceMessage ({ children }) {
  return (
    <Skeleton
      width='100%'
      zIndex='1'
      startColor='black'
      position='relative'
      isLoaded={!isUnderMaintenance}
      borderRadius='12'
    >
      {isUnderMaintenance && (
        <Text
          textAlign='center'
          top='50'
          left='50'
          right='50'
          position='absolute'
          color='white'
          zIndex='2'
          fontWeight='bold'
          css={{ visibility: 'initial !important' }}
        >
          Under maintenance - working to fix technical issue 🚧
        </Text>
      )}
      {children}
    </Skeleton>
  )
}

const mapFallbackAvatarByTitle = {
  chaotic: 'https://i.scdn.co/image/ab67616d0000b273962dffe5cc5a5118d0620b76'
}

function TrackAvatarImage ({ trackTitle, trackAvatar }) {
  const [src, setSrc] = useState(trackAvatar)

  const handleLoadingComplete = (result) => {
    setSrc(mapFallbackAvatarByTitle[trackTitle])
  }

  return (
    <Flex borderRadius='12px' width='100px' height='100px' position='relative'>
      {src && (
        <Image
          src={src}
          alt='Track Avatar'
          layout='fill'
          style={{ borderRadius: '12px' }}
          onError={handleLoadingComplete}
        />)}
    </Flex>
  )
}

function TrackStatsAccordionItem ({ track }) {
  const { stats, links, trackInfo } = track ?? {}

  return (
    <AccordionItem width='100%'>
      <h2>
        <AccordionButton width='100%'>
          <Box
            width='100%'
            color='black'
            flex='1'
            fontWeight='medium'
            textAlign='left'
          >
            {trackInfo?.title}
          </Box>
          <AccordionIcon color='black' />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <VStack justifyContent='center'>
          <SectionDescription>
            Release Date: {trackInfo?.release_date}
          </SectionDescription>

          <TrackAvatarImage
            trackAvatar={trackInfo?.avatar}
            trackTitle={trackInfo?.title}
          />
        </VStack>

        <TrackStatsTable stats={stats} links={links} />
      </AccordionPanel>
    </AccordionItem>
  )
}

export function TracksStats ({ tracks }) {
  return (
    <VStack as='section' width='100%' alignItems='flex-start'>
      <Stack
        direction={['column', 'row']}
        width='100%'
        alignItems={[null, 'flex-end']}
      >
        <VStack
          spacing='-1'
          alignItems='flex-start'
          width='100%'
        >
          <SectionTitle>tracks stats</SectionTitle>
          <SectionDescription>
            expand each row to see stats of every track
          </SectionDescription>
        </VStack>
      </Stack>

      <SkeletonWithMaintenanceMessage>
        <Accordion
          width='100%'
          allowToggle
          borderRadius='12'
          backgroundColor='tableBg'
        >
          {tracks.map(track => (
            <TrackStatsAccordionItem
              key={track?.trackInfo?.songstats_track_id}
              track={track}
            />))}
        </Accordion>
      </SkeletonWithMaintenanceMessage>
    </VStack>
  )
}
