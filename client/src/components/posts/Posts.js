import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import Alert from "../layout/Alert";
import PostForm from "./PostForm";

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Publicaciones</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Bienvenido a la comunidad
      </p>
      <PostForm />
      <p className="lead">
        <i className="fas fa-user"></i> Descubre que dicen otros programadores
      </p>
      <Alert></Alert>

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
