import { db } from "./firebase";
import { useState, useEffect } from "react";
import styles from "../styles/post.module.css";
import Post from "./posts/Post";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  // console.log("check user: ", user)
 
  useEffect(() => {
    db
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
              createAtTime: doc.data().createdAt.toDate().toLocaleTimeString("en-US"),
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


  return (
    <div className="center">
      {user ? (
        <>
          {posts.map((post) => {
            return (
              <div className="card" key={post.id}>

                <Post post={post} user={user}/>
                
                {/* <Comment posts= {post} user={user}/>
                <div className="card-action">
                  <Link href={`/posts/${post.id}`}>
                    <a>Read More</a>
                  </Link>
                </div> */}
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
