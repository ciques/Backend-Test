import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

export default function Home() {
  
  const router = useRouter()

  const [user, setUser] = useState(
    {
      name: null,
      email: null,
      phone: null,
      reference: null
    });

  const [newUser, setNewUser] = useState(true)
  const [linkUrl, setLinkUrl] = useState('')

  useEffect(() => {    
    if(!router.isReady)return;
    if(router.query.url) {
      setUser({...user, reference: router.query.url})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);



  async function sendForm() {
    try {
      const baseUrl = 'http://localhost:5000/api/'
      const res = await fetch(
        baseUrl + 'signup',
        {
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )

      const result = await res.json();
      if(result.error == 'email already registered'){
        toast.warning('email ja está cadastrado na competição')
      } else {
        // document.location.href = "/produtos/" + text;
        toast.success('user registered')
        setLinkUrl('http://localhost:5000/register/'+result.success)
        setNewUser(false)
      }

    } catch(error) {
      console.log(error)
    }
  }
  return (  
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Competition
        </h1>
        <div className={styles.options}>
          <Link href='/'>
            <a>Back to index</a>
          </Link>
          <Link href='/theend'>
            <a>End Competition</a>
          </Link>

        </div>
      </main>
      <div className={styles.form}>
       {newUser ?
       <>
        <p className={styles.title}>
          Register Now
        </p>

        <p>Name</p>
        <input onChange={(e)=>setUser({...user, name: e.target.value})}/>

        <p>Email</p>
        <input onChange={(e)=>setUser({...user, email: e.target.value})}/>

        <p>Phone</p>
        <input onChange={(e)=>setUser({...user, phone: e.target.value})}/>

        <button onClick={() => sendForm()} className={styles.formbutton}>
          Sign Up
        </button>
        </> : 
        <>
        <p className={styles.title}>
          Thank You for your register
        </p>

        <p >
          Get your special link
        </p>
        <input style={{width: '250px'}} value={linkUrl}/>

        </>}
      </div>
      <ToastContainer position="bottom-left"/>  
    </div>
  )
}
