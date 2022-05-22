import { Container, Flex, VStack } from '@chakra-ui/react'
import { Title } from 'components/Typography'
import Image from 'next/image'

const imageStyle = {
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
}

function AlbumLogo () {
  return (
    <Flex
      width={['100%', '457px']}
      height='170px'
      position='relative'
    >
      <Image
        src='/images/iutticf-logo.png'
        alt='Imagem da balança do direito'
        layout='fill'
        style={imageStyle}
      />
    </Flex>
  )
}

function ScreenLayout ({ children }) {
  return (
    <VStack
      as='main'
      width='100vw'
      height='100vh'
      backgroundColor='pink.300'
    >
      <Container
        maxW='2xl'
        height='100%'
        paddingX='5'
        paddingY='10'
        centerContent
      >
        {children}
      </Container>
    </VStack>
  )
}

export default function Home () {
  return (
    <ScreenLayout>
      <VStack width='100%' spacing='-3'>
        <AlbumLogo />
        <Title>dashboard</Title>
      </VStack>
    </ScreenLayout>
  )
}
