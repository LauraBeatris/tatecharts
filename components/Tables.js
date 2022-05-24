
import Image from 'next/image'
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'

export function SingleStatsTable ({ stats, links, tableContainerProps }) {
  const navigateToSingleOnPlatform = (platformName) => () => {
    const { spotify, appleMusic, deezer } = links ?? {}
    const url = {
      deezer: deezer.url,
      spotify: spotify.url,
      appleMusic: appleMusic.url
    }[platformName]

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
                Platform
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
                Platform
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
              <Td color='black' isNumeric>{stats?.appleMusic?.playlists_total ?? 'Not available'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}

const mapPlatformAlbumLinks = {
  spotify: '',
  deezer: '',
  appleMusic: ''
}

export function AlbumStreamsTable ({ tableContainerProps }) {
  const navigateToAlbumOnPlatform = (platform) => () => {
    window.open(mapPlatformAlbumLinks[platform])
  }

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
              Platform
            </Th>
            <Th color='black' isNumeric>Streams</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            cursor='pointer'
            onClick={navigateToAlbumOnPlatform('spotify')}
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
            <Td color='black' isNumeric>200</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export function AlbumStatsTable ({ tableContainerProps }) {
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
              Platform
            </Th>
            <Th color='black' isNumeric>Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            cursor='pointer'
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
            <Td color='black' isNumeric>#1</Td>
          </Tr>
          <Tr cursor='pointer'>
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
          <Tr
            cursor='pointer'
          >
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
