import { Text as ChakraText } from '@chakra-ui/react'

const textShadowCSS = { textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }

export function Text () {
  return <ChakraText />
}

export function Title ({ children }) {
  return (
    <ChakraText
      css={textShadowCSS}
      color='grayLight'
      fontSize='4xl'
      textShadow='lg'
      lineHeight='48px'
      fontWeight='800'
    >
      {children}
    </ChakraText>
  )
}
