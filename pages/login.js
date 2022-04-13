import { useState } from "react"
import Link from 'next/link'
import { auth } from "./firebase";
import Router from "next/router";


export default function login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await auth.signInWithEmailAndPassword(email, password)

            M.toast({ html: `Login sussess`, classes: "#00796b teal darken-2" })
            Router.push('/')
        } catch (err) {
            M.toast({ html: err.message, classes: "red" })
        }
    }
    return (
        <div className="container center">
            <h3>Login</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn #29b6f6 light-blue lighten-1">Login</button>
                <div><span>Don't have an Social account?</span><Link href="/signup"><a className="btn_submit"> Signup</a></Link></div>

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