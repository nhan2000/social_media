
import SubmitComment from './SubmitComment'
import ShowComment from "./ShowComment";

const Comment = ({ commentId, user}) => {

  return (
    <>
      <div>
        <ShowComment commentId={commentId} user={user} />
          <SubmitComment commentId={commentId} user={user}/>
      </div>
    </>
  );
};

export default Comment;
