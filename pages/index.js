import { db } from "./firebase";
import { useState, useEffect } from "react";
import styles from "../styles/post.module.css";
import Link from 'next/link'

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [comment,setComment]= useState([]);
 
  
  

  useEffect(() => {
    const getAllUserPosts = db
      .collectionGroup("userPost")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let userPosts = [];
        snapshot.forEach((doc) => {
          userPosts.push({
            uid: doc.ref.parent.parent.id,
            upid: doc.id,
            data: {
              title: doc.data().title,
              content: doc.data().content,
              imageUrl: doc.data().imageUrl,
              createdAt: doc.data().createdAt.toDate().toDateString(),
              createAtTime: doc
                .data()
                .createdAt.toDate()
                .toLocaleTimeString("en-US"),
            },
          });
        });
        setUserPosts(userPosts);
      });
    // return () => getAllUserPosts
  }, []);
  //


  useEffect(() => {
    if (!userPosts.length) {
      return;
    }
    const getAllUsers = db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
        return Promise.resolve(users);
      });

    getAllUsers.then((users) => {
      let uids = userPosts.map((usePost) => {
        return usePost.uid;
      });
      let resultUser = users.filter((user) => {
        return uids.includes(user.id);
      });
      let userPostList = [];
      userPosts.map((post) => {
        const users = resultUser.find((u) => {
          return u.id === post.uid;
        });
        userPostList.push({
          id: post.upid,
          authour: users.name,
          title: post.data.title,
          content: post.data.content,
          createAt: post.data.createdAt,
          createAtTime: post.data.createAtTime,
          imageUrl: post.data.imageUrl,
        });
      });
      setPosts(userPostList);
    });
    // return getAllUsers
  }, [userPosts]);

  useEffect(()=>{

  })

  // const handleComment = ()=>{
  //   console.log(post)
  // }


 
  return (
    <div className="center">
      {user ? (
        <>
          {posts.map((post) => {
            return (
              <div className="card" key={post.id}>
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
                <div className="card-action">
                  <Link href={`/posts/${post.id}`}>
                    <a>Read More</a>
                  </Link>
                </div>

                

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
                      <button
                        type="button"
                        className={styles.btn_submit}
                       
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <img className={styles.image_cutom} src="/logo1.jpeg" />
        </>
      )}

      <style jsx>
        {`
          .card {
            max-width: 500px;
            margin: 70px auto;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
