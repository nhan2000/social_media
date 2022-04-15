
import SubmitComment from './SubmitComment'
import ShowComment from "./ShowComment";

const Comment = ({ postId, currentUser}) => {
  // console.log("check currenUID", currentUID);

  return (
    <>
      <div>
        <ShowComment postId={postId} commenUID={currentUser} />
        <SubmitComment postId={postId} commenUID={currentUser}/>
      </div>
    </>
  );
};

export default Comment;
