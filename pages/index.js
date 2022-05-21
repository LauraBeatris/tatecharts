import Head from 'next/head'
import Image from 'next/image'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Tate Charts</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='album-logo'>
        <Image
          src='/images/iutticf-logo.png'
          alt='I Used To Think I Could Fly Album Logo'
          layout='fill'
        />
      </div>
    </div>
  )
}
