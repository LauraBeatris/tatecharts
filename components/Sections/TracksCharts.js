import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Select,
  Skeleton,
  Stack,
  VStack
} from '@chakra-ui/react'
import { SectionDescription, SectionTitle } from '../Typography'
import { TrackChartsTable } from '../Tables'
import { useTracks } from 'hooks/useTracks'
import { useState } from 'react'
import { countryListAlpha2 } from 'constants/countryCodes'

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
