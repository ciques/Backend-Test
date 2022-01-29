import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
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
    });

  const [newUser, setNewUser] = useState(true)
  const [linkUrl, setLinkUrl] = useState('')

  useEffect(() => {    
    if(!router.isReady)return;

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
        toast.success(result.success)
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
          <a href='/register'>
            Register
          </a>
          <a href='/register'>
            End Competition
          </a>
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

        <p onClick={()=>setLinkUrl('http://localhost:5000/register/'+router.query.id)}>
          Get your special link
        </p>
        <input style={{width: '250px'}} value={linkUrl}/>

        </>}
      </div>
      <ToastContainer position="bottom-left"/>  
    </div>
  )
}
