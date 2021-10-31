import Head from 'next/head';
import { Landing } from '../components/landing';
import Splash from '../components/splash';
import React from 'react';
import { useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>Protor</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
      <main>{!session ? <Landing /> : <Splash />}</main>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
        crossOrigin="anonymous"
      ></link>
    </div>
  );
}
