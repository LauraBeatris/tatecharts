import {
  Badge,
  Link as ChakraLink,
  Text,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { SectionTitle } from '../Typography'

export function AlbumCharts () {
  return (
    <VStack as='section' spacing='1' width='100%' alignItems='center'>
      <VStack
        spacing='-1'
        alignItems='center'
        width='100%'
      >
        <SectionTitle>album charts</SectionTitle>
        <ChakraLink
          as={Link}
          variant='unstyled'
          height='unset'
          href='/album-charts'
          borderRadius='0'
        >
          <Text
            wordWrap='break-word'
            whiteSpace='normal'
            textDecoration='underline'
            color='grayLight'
            cursor='pointer'
            textAlign='center'
          >
            click here to visualize
            charts data from different countries and services
          </Text>
        </ChakraLink>
      </VStack>

      <ChakraLink
        href='https://open.spotify.com/album/5fhTetHew6Eph6HfQ9O5gJ?si=T40jPIC_RqyK0uUaz_OMhg'
        isExternal
      >
        <Badge variant='solid' cursor='pointer'>
          ALBUM IS OUT NOW GO STREAM 🖤
        </Badge>
      </ChakraLink>
    </VStack>
  )
}
