import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const ShowComment = ({ commenUID, postId }) => {


  const [postComments, setpostComments] = useState([]);



  // get Allcomment from Post_Id
    useEffect(()=>{
      const getComment = 
      db.collection(`comments/${postId}/postComments`)
        .onSnapshot( async (snap)=>{
          let comments = [];
          snap.forEach(
            (doc)=>{
              comments.push({
                id: doc.id,
                data:doc.data(),
              })
            })
            const allComment = await Promise.all(
              comments.map(async (comment)=>{
                const UComment = {
                  id:comment.id,
                  content: comment.data.comment,
                }
                return UComment
              })
            )
            setpostComments(allComment)
            return allComment
        }) 
        return getComment
    },[postId])

    console.log("check getComment:", postComments);



  return (
    <div className="show_comment">


       <div className="box_comment">
      {
        postComments.map((item)=>{
          return (
            <div></div>
          )
        })
        
      }
      </div>

      <style jsx>

      </style>

    </div>
  );
};

export default ShowComment;
