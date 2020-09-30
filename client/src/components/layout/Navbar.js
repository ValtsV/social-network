import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/authActions";
import { removeAlerts } from "../../redux/actions/alertActions";

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  removeAlerts,
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Programadores</Link>
      </li>
      <li>
        <Link to="/posts">Publicaciones</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Tu perfil</span>
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={logout}>
          {" "}
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Salir</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Programadores</Link>
      </li>
      <li>
        <Link to="/register">Regístrate</Link>
      </li>
      <li>
        <Link to="/login">Iniciar sesión</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark" onClick={() => removeAlerts()}>
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Red Social
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, removeAlerts })(Navbar);
