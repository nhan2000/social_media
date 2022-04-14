
import { useState, useEffect } from "react";
import styles from "../../styles/post.module.css";
import Link from 'next/link'
import Comment from "../comment/Comment";

const Post = ({post, user}) => {


  return (
    <div>
      <div className={styles.flex}>
       
        <span className="custom_author btn">
          Author: <span>{post.authour}</span>
        </span>
      </div>
      <div className="card-image">
        <img src={post.imageUrl} />
      </div>
      <div className={styles.title_card}>{post.title}</div>
      <div className={styles.card_body}>
        <p>{post.content}</p>
      </div>
      <div>
        <p className={styles.create_at}>
          Create At: {post.createAtTime}, {post.createAt}
        </p>
      </div>
      <Comment commentId={post.id} user={user}/>
    </div>
  );
};

export default Post;
