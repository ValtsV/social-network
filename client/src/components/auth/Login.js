import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authActions";
import Alert from "../layout/Alert";
import { removeAlerts } from "../../redux/actions/alertActions";

const Login = ({ login, isAuthenticated, removeAlerts }) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const { password, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-container">
      <h1 className="large">Entrar</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Iniciar sesión
      </p>
      <Alert />
      <form
        className="form"
        onSubmit={(e) => {
          removeAlerts();
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <h4>Correo electrónico:</h4>
          <input
            type="email"
            name="email"
            placeholder="tortuga@gmail.com"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Contraseña:</h4>
          <input
            type="password"
            name="password"
            placeholder="123123"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>

        <input
          type="submit"
          value="Entrar"
          className="btn btn-primary btn-wide"
        />
      </form>
      <p className="m-1">
        No tienes la cuenta?{" "}
        <Link to="/register" onClick={() => removeAlerts()}>
          Regístrate
        </Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, removeAlerts })(Login);
