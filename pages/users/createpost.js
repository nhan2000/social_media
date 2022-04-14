
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { storage, db, serverTimestamp } from '../firebase'
import Router from "next/router";


export default function createpost({ user }) {
    const [title, setTitle] = useState('')
    const [content, setcontent] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')

    
    useEffect(() => {
        if (url) {
            try {
                db.collection('posts').doc(user.uid).collection('userPost').add({
                    title,
                    content,
                    imageUrl: url,
                    createdAt: new Date()
                })
                M.toast({ html: 'Blog Created', classes: "#00796b teal darken-2" })
                Router.push('/');

            } catch (err) {
                M.toast({ html: 'Error creating blog', classes: "red" })
            }
        }
    }, [url])

    const SubmitDetails = () => {
        if (!title || !content || !image) {
            M.toast({ html: 'Please add all the fields', classes: "red" })
            return
        }
        var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image)
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress == '100') M.toast({ html: 'Image Uploaded', classes: "#00796b teal darken-2" })

            },
            (error) => {
                M.toast({ html: error.message, classes: "red" })
            },
            () => {

                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)

                });
            }
        );

    }
    return (
        <div className="input-field rootdiv">
            <h3 className='title_create'>Create Post</h3>
            <input
                type="text"
                value={title}
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}

            />
            <textarea
                type="text"
                value={content}
                placeholder="Enter Content"
                onChange={(e) => setcontent(e.target.value)}

            />
            <div className="file-field input-field">
                <div className="btn #fb8c00 blue darken-1">
                    <span>Enter File</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn #fb8c00 blue darken-1" onClick={() => SubmitDetails()}>Create Post</button>

            <style jsx>
                {`
                .title_create {
                    text-transform:uppercase;
                    color: #3498db;
                    text-decoration: underline;
                }
                .rootdiv{
                    margin:100px auto;
                    max-width:600px;
                    padding:20px;
                    text-align:center;
                }
                `}
            </style>

        </div>
    )
}