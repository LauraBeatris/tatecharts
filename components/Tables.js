
import Image from 'next/image'
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'

export function TrackStatsTable ({ stats, links, tableContainerProps }) {
  const navigateToSingleOnPlatform = (serviceName) => () => {
    const { spotify, appleMusic, deezer } = links ?? {}
    const url = {
      deezer: deezer.url,
      spotify: spotify.url,
      appleMusic: appleMusic.url
    }[serviceName]

    window.open(url)
  }

  return (
    <VStack width='100%'>
      <TableContainer
        width='100%'
        backgroundColor='tableBg'
        {...tableContainerProps}
      >
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th color='black'>
                Service
              </Th>
              <Th color='black' isNumeric>Streams</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              cursor='pointer'
              onClick={navigateToSingleOnPlatform('spotify')}
            >
              <Td color='black'>
                <Flex alignItems='center'>
                  <Flex width='25px' height='25px' position='relative'>
                    <Image
                      src='/images/icons/spotify.png'
                      layout='fill'
                      alt='Spotify Icon'
                    />
                  </Flex>

                  <Text marginLeft='2'>Spotify</Text>
                </Flex>
              </Td>
              <Td color='black' isNumeric>{stats?.spotify?.streams_total ?? 'Not available'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <TableContainer
        width='100%'
        paddingTop='2'
        {...tableContainerProps}
      >
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th color='black'>
                Service
              </Th>
              <Th color='black' isNumeric>Playlists Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              cursor='pointer'
              onClick={navigateToSingleOnPlatform('spotify')}
            >
              <Td color='black'>
                <Flex alignItems='center'>
                  <Flex width='25px' height='25px' position='relative'>
                    <Image
                      src='/images/icons/spotify.png'
                      layout='fill'
                      alt='Spotify Icon'
                    />
                  </Flex>

                  <Text marginLeft='2'>Spotify</Text>
                </Flex>
              </Td>
              <Td color='black' isNumeric>{stats?.spotify?.playlists_total ?? 'Not available'}</Td>
            </Tr>
            <Tr
              cursor='pointer'
              onClick={navigateToSingleOnPlatform('deezer')}
            >
              <Td color='black'>
                <Flex alignItems='center'>
                  <Flex width='25px' height='25px' position='relative'>
                    <Image
                      src='/images/icons/deezer.png'
                      alt='Deezer Icon'
                      layout='fill'
                    />
                  </Flex>

                  <Text marginLeft='2'>Deezer</Text>
                </Flex>
              </Td>
              <Td color='black' isNumeric>{stats?.deezer?.playlists_total ?? 'Not available'}</Td>
            </Tr>
            <Tr
              cursor='pointer'
              onClick={navigateToSingleOnPlatform('appleMusic')}
            >
              <Td color='black'>
                <Flex alignItems='center'>
                  <Flex width='25px' height='25px' position='relative'>
                    <Image
                      src='/images/icons/apple-music.png'
                      alt='Apple Music'
                      layout='fill'
                    />
                  </Flex>

                  <Text marginLeft='2'>Apple Music</Text>
                </Flex>
              </Td>
              <Td color='black' isNumeric>
                {stats?.appleMusic?.playlists_total ?? 'Not available'}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}

export function TrackChartsTable ({ charts, tableContainerProps }) {
  const hasChartsData = charts?.length > 0

  if (!hasChartsData) {
    return (
      <VStack width='100%'>
        <Text color='gray.800' fontSize='14px'>Charts data not found</Text>
      </VStack>
    )
  }

  return (
    <VStack width='100%' maxWidth='100%' overflow='scroll'>
      <Table variant='simple' size='sm' overflow='scroll'>
        <Thead>
          <Tr>
            <Th color='black'>
              Name
            </Th>
            <Th color='black' isNumeric>
              Top Position
            </Th>
            <Th color='black' isNumeric>
              Current Position
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {charts?.map(({
            name,
            top_position: topPosition,
            current_position: currentPosition
          }) => (
            <Tr key={name}>
              <Td color='black'>
                {name}
              </Td>
              <Td color='black' isNumeric>{topPosition}</Td>
              <Td color='black' isNumeric>{currentPosition ?? 'Out of chart'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}

export function AlbumChartsTable ({ tableContainerProps }) {
  return (
    <TableContainer
      width='100%'
      borderRadius='12px'
      backgroundColor='tableBg'
      {...tableContainerProps}
    >
      <Table variant='simple' size='sm'>
        <Thead>
          <Tr>
            <Th color='black'>
              Service
            </Th>
            <Th color='black' isNumeric>Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td color='black'>
              <Flex alignItems='center'>
                <Flex width='25px' height='25px' position='relative'>
                  <Image
                    src='/images/icons/apple-music.png'
                    alt='Apple Music'
                    layout='fill'
                  />
                </Flex>

                <Text marginLeft='2'>Apple Music</Text>
              </Flex>
            </Td>
            <Td color='black' isNumeric>#1</Td>
          </Tr>
          <Tr>
            <Td color='black'>
              <Flex alignItems='center'>
                <Flex width='25px' height='25px' position='relative'>
                  <Image
                    src='/images/icons/spotify.png'
                    alt='Spotify Icon'
                    layout='fill'
                  />
                </Flex>

                <Text marginLeft='2'>Spotify</Text>
              </Flex>
            </Td>
            <Td color='black' isNumeric>Not available yet</Td>
          </Tr>
          <Tr>
            <Td color='black'>
              <Flex alignItems='center'>
                <Flex width='25px' height='25px' position='relative'>
                  <Image
                    src='/images/icons/itunes-store.jpeg'
                    alt='iTunes Store Icon'
                    layout='fill'
                  />
                </Flex>

                <Text marginLeft='2'>ITunes Store</Text>
              </Flex>
            </Td>
            <Td color='black' isNumeric>Not available yet</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
