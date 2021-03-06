import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

export default function Home() {
  const [user, setUser] = useState(
    {
      name: null,
      email: null,
      phone: null,
    });

    const [newUser, setNewUser] = useState(true)
    const [linkUrl, seLinkUrl] = useState('')



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
        toast.success(result.success)
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
          <a href='/register'>
            Register
          </a>
          <Link href='/theend'>
            <a>End Competition</a>
          </Link>
          <a href='/frontend'>
            Frontend Test
          </a>
        </div>
      </main>
      <ToastContainer position="bottom-left"/>  
    </div>
  )
}
