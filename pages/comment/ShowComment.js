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

    console.log("check comment:", comment);



  return (
    <div className="show_comment">
      Id_post ___
      {commentId}
      {comment.map(item=>{
        return (
          <li key={item.id}>{item.data.content}</li>
        )

      })
       
      }

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
