import { logPageView } from 'googleAnalytics'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const handleRouteChange = (url) => {
  logPageView(url)
}

export function useGAPageView () {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
