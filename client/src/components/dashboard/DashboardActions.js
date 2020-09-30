import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeAlerts } from "../../redux/actions/alertActions";
import PropTypes from "prop-types";

const DashboardActions = ({ removeAlerts }) => {
  return (
    <div className="dash-buttons" onClick={() => removeAlerts()}>
      <Link to="/edit-profile" className="btn">
        <i className="fas fa-user-circle text-primary"></i> Editar perfil
      </Link>
      <Link to="/add-experience" className="btn">
        <i className="fab fa-black-tie text-primary"></i> Añadir experiencia
      </Link>
      <Link to="/add-education" className="btn">
        <i className="fas fa-graduation-cap text-primary"></i> Añadir educación
      </Link>
    </div>
  );
};

DashboardActions.propTypes = {
  removeAlerts: PropTypes.func.isRequired,
};

export default connect(null, { removeAlerts })(DashboardActions);
