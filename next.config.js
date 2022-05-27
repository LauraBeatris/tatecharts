const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['is2-ssl.mzstatic.com', 'i.scdn.co', 'i.ibb.co']
  }
}

const sentryWebpackPluginOptions = {
  silent: true
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
