import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const NotificationCtx = useContext(NotificationContext);
  const [isFetchingComment, setIsFetchingComment] = useState(false);

  useEffect(() => {
    // console.log("comments", comments)
    // setComments(
    //   comments.push({ id: 0, text: "Loading new comment...", name: "System" })
    // );
    setIsFetchingComment(true);
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setIsFetchingComment(false);
      });
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler({ email, name, text }) {
    NotificationCtx.showNotification({
      title: "Adding",
      message: "Adding new comment",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, text }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message || "Error when adding new comment");
        });
      })
      .then((data) => {
        console.log(data);
        NotificationCtx.showNotification({
          title: "Added",
          message: "Added new comment successfully",
          status: "success",
        });
      })
      .catch((error) => {
        NotificationCtx.showNotification({
          title: "Error",
          message: error.message || "Error when adding new comment",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComment && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComment && <p>Loading comments...</p>}
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {
      comments,
    },
  };
}

export default Comments;
