import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Link from "next/link";
import styles from "../../styles/info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function info({ user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [createdAtDate, setcreatedAtDate] = useState("");
  const [creatAtTime, setcreateAtTime] = useState("");
  const [updateAtDate, setupdateAtDate] = useState("");
  const [updateAtTime, setupdateAtTime] = useState("");
  // const { createAt, setCreate } = useEffect('')
  // console.log(createAt);
  useEffect(() => {
    const userdb= db.collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.data().updateAt) {
          setupdateAtTime(
            doc.data().updateAt.toDate().toLocaleTimeString("en-US")
          ),
            setupdateAtDate(doc.data().updateAt.toDate().toDateString());
        }
        setName(doc.data().name),
          setDob(doc.data().dateOfBirth),
          setEmail(doc.data().email),
          setcreateAtTime(
            doc.data().createdAt.toDate().toLocaleTimeString("en-US")
          ),
          setcreatedAtDate(doc.data().createdAt.toDate().toDateString());
      });

      return userdb
  }, []);

  return (
    <div className={styles.rootdiv}>
      <div>
        <h5 className={styles.title_info}>Information User</h5>
      </div>
      {user ? (
        <>
          <div className="container">
            <div className={styles.title_info1}>
              UserName: <span className={styles.name}>{name}</span>
            </div>
            <div className={styles.title_info1}>
              Email: <span className={styles.name}>{email}</span>
            </div>
            <div className={styles.title_info1}>
              Date Of Birth: <span className={styles.name}>{dob}</span>
            </div>
            <div className={styles.title_info1}>
              Create At:{" "}
              <span className={styles.name}>
                {creatAtTime}, {createdAtDate}
              </span>
            </div>
            {!updateAtTime || !updateAtDate ? (
              ""
            ) : (
              <div className={styles.title_info1}>
                Update At:{" "}
                <span className={styles.name}>
                  {updateAtTime}, {updateAtDate}
                </span>
              </div>
            )}

            {/* <input
              className="btn #00796b teal darken-2  btnm"
              type="submit"
              value="Follow"
            /> */}
            <a className="btn #00796b teal darken-2  btnm"><FontAwesomeIcon
                  icon={faUser}
                  style={{ fontSize: 15, color: "black" }}
                /> Follow</a>
            <input
              className="btn #00796b teal darken-2  btnm"
              type="submit"
              value="Contact"
            />
            <Link href="/users/updateuser">
              <a className="btnm btn #00796b teal darken-2 ">
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{ fontSize: 15, color: "black" }}
                /> Update
                
              </a>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h5 className={styles.error_show}>Please Login or Signup</h5>
        </>
      )}
      <style jsx>
        {`
          .btnm {
            margin: 5px;
            width: 120px;
          }
        `}
      </style>
    </div>
  );
}

export default info;
