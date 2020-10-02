import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { removeAlerts, setAlert } from "../../redux/actions/alertActions";
import { register } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

const Register = ({ setAlert, register, isAuthenticated, removeAlerts }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    removeAlerts();
    if (password !== confirmPassword) {
      setAlert("Contraseñas no coinciden", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-container">
      <h1 className="large">Regístrate</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Crea Tu Cuenta
      </p>
      <Alert></Alert>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <h4>Nombre:</h4>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>Correo electrónico:</h4>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Este sitio web utiliza Gravatar para imagen de perfil
          </small>
        </div>
        <div className="form-group">
          <h4>Contraseña:</h4>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <h4>Confirmar contraseña:</h4>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          value="Regístrate"
          className="btn btn-primary btn-wide"
        />
      </form>
      <p className="m-1">
        Ya tienes una cuenta?{" "}
        <Link to="/login" onClick={() => removeAlerts()}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, removeAlerts })(
  Register
);
