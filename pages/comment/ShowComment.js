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
                idPost: doc.ref.parent.parent.id,
                idComment: doc.id,
                data: {
                  content:doc.data().comment
                }
              })
            })
          setComment(postComments);
        }) 
    },[])

    useEffect(()=>{
      if(!comment){
        return
      }
    })
  return (
    <div className="show_comment">
      {/* Id_post ___
      {commentId}
      {comment.map(item=>{
        return (
          <li key={item.idComment}>{item.data.content}</li>
        )
      })
      } */}

    </div>
  );
};

export default ShowComment;
