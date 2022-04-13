import '../styles/globals.css'
import Head from 'next/head'
import Navbar from './components/Navbar'
import { auth } from './firebase'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }
      else setUser(null)
    })

  }, [])
  return <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </Head>
    <Navbar user={user} />
    <Component {...pageProps} user={user} />
  </>
}

export default MyApp