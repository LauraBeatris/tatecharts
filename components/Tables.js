
import Image from 'next/image'
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'

const mapPlatformSingleLinks = {
  spotify: 'https://open.spotify.com/track/3I1Smy5zhzNEc9grpjwY1s?si=2af28cac73fa4e1b',
  deezer: 'https://deezer.page.link/wekUBAJQDUXmWSAWA',
  appleMusic: 'https://music.apple.com/us/album/what-would-you-do/1620209610?i=1620209736'
}

export function LastSingleStreamsTable ({ tableContainerProps }) {
  const navigateToSingleOnPlatform = (platform) => () => {
    window.open(mapPlatformSingleLinks[platform])
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
            <Td color='black' isNumeric>200</Td>
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
            <Td color='black' isNumeric>100</Td>
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
            <Td color='black' isNumeric>100</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const mapPlatformAlbumLinks = {
  spotify: 'https://open.spotify.com/track/3I1Smy5zhzNEc9grpjwY1s?si=2af28cac73fa4e1b',
  deezer: 'https://deezer.page.link/wekUBAJQDUXmWSAWA',
  appleMusic: 'https://music.apple.com/us/album/what-would-you-do/1620209610?i=1620209736'
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
          <Tr
            cursor='pointer'
            onClick={navigateToAlbumOnPlatform('deezer')}
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
            <Td color='black' isNumeric>100</Td>
          </Tr>
          <Tr
            cursor='pointer'
            onClick={navigateToAlbumOnPlatform('appleMusic')}
          >
            <Td color='black'>
              <Flex alignItems='center'>
                <Flex width='25px' height='25px' position='relative'>
                  <Image
                    src='/images/icons/apple-music.png'
                    alt='Apple Music Icon'
                    layout='fill'
                  />
                </Flex>

                <Text marginLeft='2'>Apple Music</Text>
              </Flex>
            </Td>
            <Td color='black' isNumeric>100</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
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
              Platform
            </Th>
            <Th color='black' isNumeric>Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr cursor='pointer'>
            <Td color='black'>
              <Flex alignItems='center'>
                <Flex width='25px' height='25px' position='relative'>
                  <Image
                    src='/images/icons/billboard.png'
                    layout='fill'
                    alt='Billboard Icon'
                  />
                </Flex>

                <Text marginLeft='2'>Billboard</Text>
              </Flex>
            </Td>
            <Td color='black' isNumeric>#1</Td>
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
            <Td color='black' isNumeric>#1</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}