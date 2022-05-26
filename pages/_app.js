import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { theme } from 'styles/theme'
import { global } from 'styles/global'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { useState } from 'react'

function MyApp ({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={global} />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
