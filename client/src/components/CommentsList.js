import React from "react";
const Comment = ({ comment }) => {
  const { id, text, author, createdAt } = comment;
  return (
    <div key={id}>
      <div>
        <div>
          <span>{author.picture}</span>
        </div>
        <div>
          <span>{author.name}</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <div>{text}</div>
    </div>
  );
};
const CommentsList = ({ commentsList }) => {
  console.log(commentsList);
  const content = () => {
    return commentsList.map(comment => <Comment comment={comment} />);
  };
  console.log(content());
  return <div>{content()}</div>;
};
export default CommentsList;
