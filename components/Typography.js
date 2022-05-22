import { Text } from '@chakra-ui/react'

const textShadowCSS = { textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }

export function Title ({ children }) {
  return (
    <Text
      as='h1'
      css={textShadowCSS}
      color='grayLight'
      fontSize='4xl'
      textShadow='lg'
      lineHeight='48px'
      fontWeight='800'
    >
      {children}
    </Text>
  )
}

export function SectionTitle ({ children }) {
  return (
    <Text
      as='h2'
      css={textShadowCSS}
      color='grayLight'
      fontSize='2xl'
      textShadow='lg'
      lineHeight='39px'
      fontWeight='600'
    >
      {children}
    </Text>
  )
}

export function SectionDescription ({ children }) {
  return (
    <Text
      as='h3'
      color='black'
      fontSize='sm'
      textShadow='lg'
      lineHeight='17px'
      fontWeight='600'
    >
      {children}
    </Text>
  )
}
