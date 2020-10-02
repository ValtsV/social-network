import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/postActions";
import { removeAlerts } from "../../redux/actions/alertActions";

const CommentForm = ({ postId, addComment, removeAlerts }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="post-form-header">
        <h3>Deja un comentario</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          removeAlerts();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" value="Subir" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  removeAlerts: PropTypes.func.isRequired,
};

export default connect(null, { addComment, removeAlerts })(CommentForm);
