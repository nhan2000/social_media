import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const ShowComment = ({ commenUID, postId }) => {
  const [postComments, setpostComments] = useState([]);

  // get Allcomment from Post_Id
  useEffect(() => {
    const getComment = db
      .collection(`comments/${postId}/postComments`)
      .onSnapshot(async (snap) => {
        let comments = [];
        snap.forEach((doc) => {
          comments.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        const allComment = await Promise.all(
          comments.map(async (comment) => {
            const UComment = {
              id: comment.id,
              content: comment.data.comment,
              //author:comment.data.userRef.path
              //authour: (await db.doc(comment.data.userRef.path).get()).data(),
              authour: (
                await db.doc(comment.data.userRef.path).get()
              ).data().name,
            };
            return UComment;
          })
          );
          console.log("check allcm", allComment);
        setpostComments(allComment);
        return allComment;
      });
    return getComment;
    
  }, [postId]);

  // console.log("check getComment:", postComments);

  return (
    <div className="show_comment">
      {
        postComments.map((item)=>{
          return (
            <div className='item_comment' key={item.id}>
            <span className="show_name">{item.authour}</span>: <span>{item.content}</span>
            </div>
          )

        })
      }

      <style jsx>
        {`
          .box_comment {
            border: 2px solid #3498db;
            width: 99%;
            margin: 5px auto;
            padding: 5px 5px;
            border-radius: 8px;
          }
          .item_comment {
            background: #b2ebf2;
            padding: 10px;
            margin:5px;
            width:98%;
            text-align: left;
            border-radius:8px
          }
          .show_name  {
            font-weight:600
          }
        `}
      </style>
    </div>
  );
};

export default ShowComment;
