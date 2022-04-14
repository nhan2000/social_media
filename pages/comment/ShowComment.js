import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const ShowComment = ({ user, commentId }) => {
  const [comment, setComment] = useState([]);

  const allComment = db
    .collection("comments")
    .doc(commentId)
    .collection("postComments")
    .get();

  return (
    <div className="show_comment">
      ShowComment ___
      {commentId}
    </div>
  );
};

export default ShowComment;
