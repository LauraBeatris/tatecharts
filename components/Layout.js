import { Container, Flex, HStack, Link, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { Title } from './Typography'

const imageStyle = {
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
}

function AlbumLogo () {
  return (
    <Flex
      zIndex='2'
      width={['100%', '457px']}
      height='170px'
      position='relative'
    >
      <Image
        src='/images/iutticf-logo.png'
        alt='I Used To Think I Could Fly Album Logo'
        layout='fill'
        priority
        style={imageStyle}
      />
    </Flex>
  )
}

function AlbumCover ({ src, flexProps }) {
  return (
    <Flex
      visibility={['hidden', 'initial']}
      width='162px'
      height='159px'
      position='absolute'
      {...flexProps}
    >
      <Image
        src={src}
        layout='fill'
        alt='Album Cover'
      />
    </Flex>
  )
}

function Header () {
  return (
    <HStack
      position='relative'
      width='100%'
      as='header'
    >
      <AlbumCover
        flexProps={{ right: '0' }}
        src='/images/cover-1.png'
      />

      <VStack
        position='relative'
        width='100%'
        spacing='-3'
      >
        <AlbumLogo />
        <Title>dashboard</Title>

      </VStack>

      <AlbumCover
        flexProps={{ left: '0' }}
        src='/images/cover-2.png'
      />
    </HStack>
  )
}

export const twitterHandle = 'sourttate'
const footerLinks = {
  twitter: `https://twitter.com/${twitterHandle}`,
  donation: 'https://www.buymeacoffee.com/laurabeatris'
}

function Footer () {
  return (
    <VStack
      as='footer'
      width='100%'
      paddingTop='5'
      spacing='1'
      textAlign='center'
    >
      <Title
        as='p'
        fontSize='32px'
        lineHeight='32px'
      >
        created by{' '}
        <Link
          href={footerLinks.twitter}
          isExternal
        >
          @{twitterHandle}
        </Link>
      </Title>
      <Text as='small' color='black'>
        made by a fan, for fans
      </Text>
      <Text
        as='p'
        color='black'
        fontSize='24px'
        maxWidth='100%'
        overflowWrap='break-word'
      >
        <Link
          href={footerLinks.donation}
          isExternal
        >
          {footerLinks.donation}
        </Link>
      </Text>
    </VStack>
  )
}

export function ScreenLayout ({ children }) {
  return (
    <VStack
      as='main'
      width='100vw'
      minHeight='100vh'
      backgroundColor='pink.300'
    >
      <Container
        flex='1'
        maxW='2xl'
        height='100%'
        paddingX='5'
        paddingY='10'
        centerContent
        justifyContent='space-between'
      >
        <Header />
        {children}
        <Footer />
      </Container>
    </VStack>
  )
}
