export const logPageView = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url
  })
}

export const logEvent = ({ action, params }) => {
  window.gtag('event', action, params)
}

export const logTrackStatsClick = ({ trackTitle }) => {
  logEvent('event', 'track-stats-click', { trackTitle })
}

export const logTrackChartsClick = ({ trackTitle, service, countryCode }) => {
  logEvent('event', 'track-stats-click', { trackTitle, service, countryCode })
}
