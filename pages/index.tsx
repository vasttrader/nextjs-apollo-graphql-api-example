import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Project 2021</title>
      </Head>
      <main>
        <Image src="/vasttrader.svg" alt="Vast Trader" width={250} height={250} />
      </main>
    </>
  )
}

export default Home
