import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styles from "../../styles/comment.module.css"

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
          // console.log("check allcm", allComment);
        setpostComments(allComment);
        return allComment;
      });
    return getComment;
    
  }, [postId]);

  // console.log("check getComment:", postComments);

  return (
    <div className={styles.show_comment}>
      {
        postComments.map((item)=>{
          
          // return (
          //   <div className={styles.item_comment} key={item.id}>
          //   <span className={styles.show_name}>{item.authour}</span> ___ <span>{item.content}</span>
          //   </div>
          // )

        })
      }
    </div>
  );
};

export default ShowComment;
