import styles from '../../styles/post.module.css'
import React, {useState, useEffect} from 'react'
import { db } from '../firebase';

const  SubmitComment =({commentId})=> {

    const [comment, setComment] = useState([]);
    // const [name, setName]= useState('');
    // useEffect(() => {
      
    //     db.collection('comments').doc(commentId).collection('postComments').add({
    //         comment:comment,
    //         createAt: new Date()
    //     })
    // }, [])
    
    const handleComment = ()=>{
        db.collection('comments').doc(commentId).collection('postComments').add({
            comment:comment,
            createAt: new Date()
        })
    }
  return (
    <div>
        <form>
              <textarea
                placeholder="Write your comment here"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              ></textarea>
              <div className={styles.comment_box}>
                <button onClick={()=>handleComment()} type="button" className={styles.btn_submit}>
                  Submit
                </button>
              </div>
            </form>

    </div>
  )
}

export default SubmitComment


