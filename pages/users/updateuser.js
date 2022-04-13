import React from 'react'
import { useState, useEffect } from 'react'
import { db, serverTimestamp } from '../firebase'
import Router from "next/router";
import styles from '../../styles/updateuser.module.css'


function info({ user }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('')
    useEffect(() => {
        db.collection('users').doc(user.uid).get().then((doc) => {
            setName(doc.data().name),
                setDob(doc.data().dateOfBirth)
        })
    }, [])
    const handleUpdateUser = () => {
        db.collection('users').doc(user.uid).update({
            name: name,
            dateOfBirth: dob,
            updateAt: serverTimestamp()
        })
        M.toast({ html: `Update User Info Success  ${name}`, classes: "green" })
        Router.back();
    }

    return (
        <div className={styles.rootdiv}>
            <div><h5 className={styles.title_info}>Update User</h5></div>
            {user ?
                <>
                    <div className="container">
                        <div className={styles.title_info1}>UserName: <input value={name} className={styles.name} onChange={(e) => setName(e.target.value)} /></div>
                        {/* <div className='title_info1'>Email: <input value={email} className='name' onChange={(e) => setEmail(e.target.value)} /></div> */}
                        <div className={styles.title_info1}>Date Of Birth: <input value={dob} className={styles.name} onChange={(e) => setDob(e.target.value)} /></div>
                        <input className='btn' type="submit" value="Submit" onClick={handleUpdateUser} />
                    </div>
                </>
                :
                <>
                    <h5 className={styles.error_show}>Please Login or Signup</h5>
                </>
            }
        </div>
    )
}

export default info