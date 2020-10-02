import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearProfile } from "../../redux/actions/profileActions";
import {
  addLike,
  removeLike,
  deletePost,
} from "../../redux/actions/postActions";
import Moment from "react-moment";
import { removeAlerts } from "../../redux/actions/alertActions";

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, date, comments },
  clearProfile,
  deletePost,
  showActions = true,
  history,
  removeAlerts,
}) => {
  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link
          to={`/profile/${user}`}
          onClick={() => {
            removeAlerts();
            clearProfile();
          }}
        >
          <img className="round-img" src={avatar} alt="dev_img" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Subido en <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button className="btn" onClick={(e) => addLike(_id)}>
              <i className="fas fa-thumbs-up"></i> <span>{likes.length}</span>
            </button>
            <button className="btn" onClick={(e) => removeLike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>

            <Link to={`posts/${_id}`} onClick={() => removeAlerts()}>
              <button className="btn btn-primary">
                <i className="fas fa-comment"></i>{" "}
                <span>{comments.length}</span>
              </button>
            </Link>
          </Fragment>
        )}
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => deletePost(_id, history)}
          >
            <i className="fas fa-times"></i>{" "}
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearProfile: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  clearProfile,
  addLike,
  removeLike,
  deletePost,
  removeAlerts,
})(withRouter(PostItem));
