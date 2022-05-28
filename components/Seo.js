import { NextSeo } from 'next-seo'
import { twitterHandle } from './Layout'

const title = 'Tate McRae Charts'
const description = 'A website to display tracks charts/stats of the Canadian singer Tate McRae'
const url = 'https://tatecharts.com'

export function Seo () {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url,
        title,
        description,
        locale: 'en-CA',
        images: [
          {
            url: `${url}/images/banner.png`,
            alt: title,
            width: 1280,
            height: 720
          }
        ]
      }}
      twitter={{
        site: `@${twitterHandle}`,
        handle: `@${twitterHandle}`,
        cardType: 'summary_large_image'
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/images/fav.png'
        }
      ]}
    />
  )
}
