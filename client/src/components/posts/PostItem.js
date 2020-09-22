import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearProfile } from "../../redux/actions/profileActions";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  clearProfile,
}) => {
  console.log(user);
  console.log(_id);
  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${user}`} onClick={() => clearProfile()}>
          <img className="round-img" src={avatar} alt="dev_img" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <button className="btn">
          <i className="fas fa-thumbs-up"></i> <span>{likes.length}</span>
        </button>
        <button className="btn">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`post/${_id}`} className="btn btn-primary">
          Discussion
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { clearProfile })(PostItem);
