import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { theme } from 'styles/theme'
import { global } from 'styles/global'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Global styles={global} />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
