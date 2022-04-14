import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const ShowComment = ({ user, commentId }) => {
  const [comment, setComment] = useState([]);

    useEffect(()=>{
      db.collectionGroup('postComments')
        .onSnapshot((snap)=>{
          let postComments = [];
          snap.forEach(
            (doc)=>{
              postComments.push({
                uid: doc.ref.parent.parent.id,
                upid: doc.id,
                data: {
                  content:doc.data().comment
                }
              })
            })
          setComment(postComments);
        }) 
    },[])
    
  return (
    <div className="show_comment">
      ShowComment ___
      {commentId}

      {/* {comment.data.content} */}

      {/* {
      comment.map((item)=>{
        <p>HKT</p>
      })
      } */}
      

      {/* {comment} */}
    </div>
  );
};

export default ShowComment;
