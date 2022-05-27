import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { theme } from 'styles/theme'
import { global } from 'styles/global'
import Script from 'next/script'
import { useGAPageView } from 'hooks/useGAPageView'

function MyApp ({ Component, pageProps }) {
  useGAPageView()

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id='google-analytics' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Global styles={global} />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
