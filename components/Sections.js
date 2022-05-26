import Image from 'next/image'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  HStack, Link, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from './Typography'
import { TrackChartsTable, TrackStatsTable } from './Tables'
import { useTracks } from 'hooks/useTracks'
import { useState } from 'react'
import { countryListAlpha2 } from 'constants/countryCodes'
import { useAlbumCharts } from 'hooks/useAlbumCharts'

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

export function TracksStats () {
  const { tracks, isLoading } = useTracks()

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
            <TrackStatsAccordionItem
              key={track?.trackInfo?.songstats_track_id}
              track={track}
            />))}
        </Accordion>
      </Skeleton>
    </VStack>
  )
}

function transformChartsList ({ charts, service, countryCode }) {
  if (service === 'spotify') {
    return charts?.filter(({ spotifyid: spotifyId, chart_type: chartType }) => {
      const hasSupportedSpotifyChartType = !['City', 'Local Pulse'].includes(chartType)
      const hasSpotifyCountryCode = spotifyId?.includes(countryCode.toLowerCase())

      return hasSupportedSpotifyChartType && hasSpotifyCountryCode
    }) ?? []
  }

  if (service === 'apple_music') {
    return charts?.filter(({ applemusicid: appleMusicId }) => {
      const hasAppleMusicCountryCode = appleMusicId?.includes(countryCode.toLowerCase())

      return hasAppleMusicCountryCode
    }) ?? []
  }

  if (service === 'deezer') {
    return charts?.filter(({ country_code: deezerCountryCode }) => {
      const hasDeezerCountryCode = deezerCountryCode.toLowerCase().includes(countryCode.toLowerCase())

      return hasDeezerCountryCode
    }) ?? []
  }
}

function TrackChartsAccordionItem ({ service, countryCode, track }) {
  const { stats, trackInfo } = track ?? {}
  const { spotify, deezer, appleMusic } = stats ?? {}

  const transformedCharts = transformChartsList({
    charts: {
      deezer: deezer?.track_charts,
      spotify: spotify?.charts,
      apple_music: [
        ...(appleMusic?.track_charts ?? []),
        ...(appleMusic?.album_charts ?? [])
      ]
    }[service],
    service,
    countryCode
  }) ?? []

  return (
    <AccordionItem width='100%'>
      <h2>
        <AccordionButton width='100%'>
          <Box
            flex='1'
            width='100%'
            color='black'
            fontWeight='medium'
            textAlign='left'
          >
            {trackInfo?.title}
          </Box>
          <AccordionIcon color='black' />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <TrackChartsTable key={service} charts={transformedCharts} />
      </AccordionPanel>
    </AccordionItem>
  )
}
const countryCodes = Object.keys(countryListAlpha2)
function ServiceMarketSelects ({
  service,
  countryCode,
  onServiceChange,
  onCountryCodeChange
}) {
  return (
    <HStack width='100%' paddingTop='2'>
      <Select
        size='xs'
        value={service}
        onChange={onServiceChange}
        placeholder='Services'
        defaultValue='spotify'
      >
        <option value='spotify'>Spotify</option>
        <option value='deezer'>Deezer</option>
        <option value='apple_music'>Apple Music</option>
      </Select>

      <Select
        size='xs'
        placeholder='Market'
        value={countryCode}
        onChange={onCountryCodeChange}
      >
        {countryCodes.map((countryCode) => (
          <option
            key={countryCode}
            value={countryCode}
          >
            {countryListAlpha2[countryCode]}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

export function TracksCharts () {
  const [service, setService] = useState('spotify')
  const [countryCode, setCountryCode] = useState('CA')
  const { tracks, isLoading } = useTracks()

  const handleServiceChange = (event) => {
    setService(event.target.value)
  }

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value)
  }

  return (
    <VStack as='section' width='100%' alignItems='flex-start'>
      <Stack direction={['column', 'row']} width='100%' alignItems={[null, 'flex-end']}>
        <VStack
          spacing='-1'
          alignItems='flex-start'
          width='100%'
        >
          <SectionTitle>tracks charts</SectionTitle>
          <SectionDescription>
            expand each row to see charts of every track per service and country
          </SectionDescription>

          <ServiceMarketSelects
            service={service}
            countryCode={countryCode}
            onServiceChange={handleServiceChange}
            onCountryCodeChange={handleCountryCodeChange}
          />
        </VStack>
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
            <TrackChartsAccordionItem
              key={track?.trackInfo?.songstats_track_id}
              track={track}
              service={service}
              countryCode={countryCode}
            />))}
        </Accordion>
      </Skeleton>
    </VStack>
  )
}

export function AlbumCharts () {
  const { data, isLoading } = useAlbumCharts()
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log({ data })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor='tableBg'>
          <ModalHeader color='black'>Album Charts</ModalHeader>
          <ModalCloseButton color='black' />
          <ModalBody>
            <Skeleton isLoaded={!isLoading}>
              {data?.map(({ service, charts }) => (
                <VStack key={service} maxHeight='60vh' overflow='scroll'>
                  <Text fontSize='20px' fontWeight='bold' color='pink.400'>{service}</Text>
                  <UnorderedList color='black'>
                    {charts.map((value) => (
                      <ListItem key={value}>{value}</ListItem>
                    ))}
                  </UnorderedList>
                </VStack>
              ))}
            </Skeleton>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='pink' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack as='section' spacing='1' width='100%' alignItems='center'>
        <VStack
          spacing='-1'
          alignItems='center'
          width='100%'
        >
          <SectionTitle>album charts</SectionTitle>
          <Button
            variant='unstyled'
            height='unset'
            onClick={onOpen}
            borderRadius='0'
          >
            <Text
              wordWrap='break-word'
              whiteSpace='normal'
              textDecoration='underline'
              color='grayLight'
            >
              click here to visualize
              charts data from different countries
            </Text>
          </Button>
        </VStack>

        <Link
          href='https://open.spotify.com/track/3I1Smy5zhzNEc9grpjwY1s?si=8299acbf237c4bba'
          isExternal
        >
          <Badge variant='solid' cursor='pointer'>
            Go stream the last single: WWYD 🖤
          </Badge>
        </Link>
      </VStack>
    </>
  )
}
