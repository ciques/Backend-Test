import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function End() {
    const [fetched, setFetched] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(!fetched) Form();
    }, [fetched])

    async function Form() {
    try {
      const baseUrl = 'http://localhost:5000/api/'
      const res = await fetch(
        baseUrl + 'showScores',
        {          
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }
      )

      const result = await res.json();
      console.log(result.object)
      setUsers(result.object.users)

    } catch(error) {
      console.log(error)
    }
    setFetched(true)
  }

  return(
    <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Results of the Competition
      </h1>
      <div className={styles.options}>
      <Link href="/">
        <a>
          Back to Start
        </a>
      </Link>
      </div>      
      <div className={styles.tablehead}>
        {users.length ?
          <>
            <div className={styles.tableitenstitle}>
              <div>Position</div>
              <div>Name</div>
              <div>Telephone</div>
              <div>Email</div>
              <div>Score</div>
            </div> 

            {users.map((user, index) => (
              <div key={user.email} className={styles.tableitens}>
                <div>{index+1}</div>
                <div>{user.name}</div>
                <div>{user.phone}</div>
                <div>{user.email}</div>
                <div>{user.score}</div>
              </div>
            ))}
            </>
          : 
          <>
            <p>Sem usuários cadastrados</p>
          </>
        }
      </div>
    </main>
  </div>
  )
}