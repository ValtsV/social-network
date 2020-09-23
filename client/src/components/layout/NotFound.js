import React, { Fragment } from "react";

const NotFound = (props) => {
  return (
    <Fragment>
      <div className="centered my-2">
        <div>
          <h1 className="large text-primary">
            <i className="fas fa-exclamation-triangle"></i> Page Not Found
          </h1>
          <p className="lead">Sorry, this page doesn't exist</p>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
