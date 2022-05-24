import Image from 'next/image'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Flex, HStack, Link, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from './Typography'
import { AlbumStatsTable, AlbumStreamsTable, SingleStatsTable } from './Tables'
import { ChartTargetSelect } from './ChartTargetSelect'
import { useTracks } from 'hooks/useTracks'

function TrackAccordionItem ({ track }) {
  const { stats, links, trackInfo } = track ?? {}

  return (
    <AccordionItem width='100%'>
      <h2>
        <AccordionButton width='100%'>
          <Box width='100%' color='black' flex='1' textAlign='left'>
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

          {trackInfo?.avatar && (
            <Flex borderRadius='12px' width='100px' height='100px' position='relative'>
              <Image
                src={trackInfo.avatar}
                layout='fill'
                alt='Track Avatar'
                style={{ borderRadius: '12px' }}
              />
            </Flex>
          )}

        </VStack>

        <SingleStatsTable stats={stats} links={links} />
      </AccordionPanel>
    </AccordionItem>
  )
}

export function TracksStats () {
  const { tracks, isLoading } = useTracks()

  return (
    <VStack as='section' width='100%' alignItems='flex-start'>
      <Stack direction={['column', 'row']} width='100%' alignItems={[null, 'flex-end']}>
        <VStack
          spacing='-1'
          alignItems='flex-start'
          width='100%'
        >
          <SectionTitle>track stats</SectionTitle>
          <SectionDescription>
            expand each row to see stats of every track
          </SectionDescription>
        </VStack>

        <Link
          href='https://open.spotify.com/track/3I1Smy5zhzNEc9grpjwY1s?si=8299acbf237c4bba'
          isExternal
        >
          <Badge variant='solid' cursor='pointer'>
            Go stream the last single: WWYD 🖤
          </Badge>
        </Link>
      </Stack>

      <Skeleton
        width='100%'
        isLoaded={!isLoading}
        borderRadius='12'
        startColor='tableBg'
      >
        <Accordion
          width='100%'
          allowToggle
          borderRadius='12'
          backgroundColor='tableBg'
        >
          {tracks.map(track => (
            <TrackAccordionItem
              key={track?.trackInfo?.songstats_track_id}
              track={track}
            />))}
        </Accordion>
      </Skeleton>
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
