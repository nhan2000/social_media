import '../styles/globals.css'
import Head from 'next/head'
import Navbar from './components/Navbar'
import { auth } from './firebase'
import { useState, useEffect } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

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