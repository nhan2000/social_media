import Link from 'next/link'
import { auth } from '../firebase'
import Search from './Search'


export default function Navbar({ user }) {

    return (
        <nav className="nav-extended">
            <div className="nav-wrapper #29b6f6 light-blue lighten-1">
                <Link href="/" ><a href="#!" className="brand-logo">Social Blogs</a></Link>
                <ul className="right hide-on-med-and-down">
                    {user ?
                        <>
                            {/* <Search/> */}
                            <Search/>
                            <Link href="/users/createpost" ><a className="btn #ff80ab pink accent-1"> Create Post</a></Link>
                            <Link href="/users/info" ><a className="btn #00796b teal darken-2 btnm">Info</a></Link>
                            <a className="waves-effect waves-light btn #00796b teal darken-2 btnm" onClick={() => auth.signOut(
                            )}>Logout</a>
                        </>
                        :
                        <>
                            <span className='show_login'>Login to Creat Post</span>
                            <Link href="/login" ><a className="btn #00796b teal darken-2">Login</a></Link>
                            <Link href="/signup"><a className="btn #00796b teal darken-2" >Signup</a></Link>
                        </>
                    }
                </ul>
            </div>
            <style jsx>
                {
                    `
                    .brand-logo {
                        margin-left: 10px
                    }
                    .show_login {
                        text-decoration:underline;
                    }
                    .nav-extended{
                        position:fixed;
                        z-index:100;
                        top:0;
                    }
                    .btnm {
                        width:120px
                    }
                    `
                }
            </style>

        </nav>
    )
}