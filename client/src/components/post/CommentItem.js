import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../redux/actions/postActions";
import { clearProfile } from "../../redux/actions/profileActions";
import { removeAlerts } from "../../redux/actions/alertActions";

const CommentItem = ({
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
  deleteComment,
  clearProfile,
  removeAlerts,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div className="avatar-flex-cont">
        <div className="phantom-cont"></div>
        <Link
          to={`/profile/${user}`}
          onClick={() => {
            removeAlerts();
            clearProfile();
          }}
        >
          <img
            src={avatar}
            alt="dev_image"
            className="round-img round-img-small"
          />
          <h4>{name}</h4>
        </Link>
        {!auth.loading === true && (user === auth.user._id) === true ? (
          <button
            className="btn btn-danger btn-small-screen"
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <div className="phantom-cont"></div>
        )}
      </div>
      <div className="comment-flex-cont">
        <div>
          <p className="my-1 mr-2">{text}</p>
          <div>
            <div className="post-date-flex-cont">
              <p className="post-date post-date-small-screen">
                Subido en <Moment format="YYYY/MM/DD">{date}</Moment>
              </p>
            </div>
          </div>
        </div>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger btn-big-screen"
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteComment,
  clearProfile,
  removeAlerts,
})(CommentItem);
