import styles from '../../styles/post.module.css'
import React, {useState} from 'react'
import { db,serverTimestamp } from '../firebase';

const  SubmitComment =({postId, commenUID})=> {

    const [comment, setComment] = useState([]);
    const handleComment = (e)=>{
      e.preventDefault()
      db.collection('comments').doc(postId).collection('postComments').add({
          comment:comment,
          createAt: serverTimestamp(),
          userRef: db.doc(`/users/${commenUID.uid}`),
      })
      alert("Comment Success")
      setComment('');

  }
  return (
    <div>
        <form>
              <textarea
                placeholder="Write your comment here"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}></textarea>
              <div className={styles.comment_box}>
                <button onClick={(e)=>handleComment(e)} type="button" className={styles.btn_submit}>
                  Submit
                </button>
              </div>
            </form>
    </div>
  )
}

export default SubmitComment




