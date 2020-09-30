import React, { Fragment } from "react";

const NotFound = (props) => {
  return (
    <Fragment>
      <div className="centered my-2">
        <div>
          <h1 className="large text-primary">
            <i className="fas fa-exclamation-triangle"></i> Página No Encontrada
          </h1>
          <p className="lead">Lo siento, esta página no existe</p>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
