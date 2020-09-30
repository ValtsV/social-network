import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../redux/actions/postActions";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import CommentForm from "./CommentForm";
import Alert from "../layout/Alert";
import CommentItem from "./CommentItem";
import { removeAlerts } from "../../redux/actions/alertActions";

const Post = ({
  getPost,
  getCurrentProfile,
  post: { post, loading },
  match,
  removeAlerts,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPost(match.params.id);
  }, [getCurrentProfile, getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn my-1" onClick={() => removeAlerts()}>
        Volver a las publicaciones
      </Link>
      <Alert />
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPost,
  getCurrentProfile,
  removeAlerts,
})(Post);
