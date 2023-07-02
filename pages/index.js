import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomeAddress from './homeaddress'
import Header from './header'
import { useEffect, useRef, useState } from 'react'
import Coba from './coba'
import { authMiddleware } from './utils/authMiddleware'
import { getCookie, removeCookie } from './utils/cookie'
import { useRouter } from 'next/router'
import { isExpired, decodeToken } from "react-jwt";
import Footer from './footer'


export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const token = getCookie('token');
  useEffect(() => {
    // Periksa apakah pengguna sudah login dengan memeriksa keberadaan token
    console.log("ada tokne hello", isExpired(token) )
    if (!token || isExpired(token)) {
      removeCookie('token')
      // Jika tidak ada token, redirect ke halaman login
      router.push('/login');
    }else {
      // Jika ada token, beri tahu bahwa pemrosesan token selesai
      setIsLoading(false);
      // router.push('/')
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }  
  
  return (

    <div>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDM0hoZiuTA5JVkJJeNNjjkd6wlD1JP5C0&libraries=places&callback=initMap"></script>
        
      </Head> */}
      <Header />
     <HomeAddress />
     <Footer />
     {/* <Coba /> */}
      </div>
  )
}

