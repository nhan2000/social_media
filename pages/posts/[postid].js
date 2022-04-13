import { db } from "../firebase";
import { useState, useEffect } from "react";
import styles from "../../styles/post.module.css";
import Link from "next/link";
import { useRouter } from 'next/router'
import { route } from "next/dist/server/router";


const detailPost = ({post, user }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [comment, setComment] = useState("");
  const router = useRouter()


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
              createAtTime: doc.data().createdAt.toDate().toLocaleTimeString("en-US"),
            },
          });
        });
        setUserPosts(userPosts);
      });
    // return () => getAllUserPosts
  }, []);

  console.log("Check", userPosts);


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
  console.log(posts);


  
  return (
    <div className="center">
     
        {/* {
           posts.map((post))
        }
        */}
      
      <style jsx>
        {`
        .center {
            margin-top:300px;
        }
        .root {
            margin-top:300px;
        }

        `}
      </style>
    </div>
  );
};

export default detailPost;


