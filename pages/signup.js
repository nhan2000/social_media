import { useState } from "react"
import Link from 'next/link'
import { auth, db, serverTimestamp } from './firebase'
import Router from "next/router";

var md5 = require('md5');
export default function signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password)
            await result.user.updateProfile({
                displayName: name
            })
            db.collection("users").doc(result.user.uid).set({
                name: name,
                email: result.user.email,
                dateOfBirth: dob,
                createdAt: serverTimestamp(),
                password: md5(password)
            })
            Router.push('/');
            M.toast({ html: `Hi ${name}`, classes: "#00796b teal darken-2" })
        } catch (err) {
            M.toast({ html: err.message, classes: "red" })
        }
    }

    return (
        <div className="container center">
            <h3>Sign Up</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="text" placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <button type="submit" className="btn #29b6f6 light-blue lighten-1">Signup</button>
                <div><span >Already have an account?</span><Link href="/login"><a className="btn_submit"> Login</a></Link></div>
            </form>

            <style jsx>
                {
                    `
        .btn_submit {
            color:#3498db;
        }
        .container {
            margin-top: 10rem;
        }

        `
                }
            </style>
        </div>
    )
}