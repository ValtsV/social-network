import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authActions";
import Alert from "../layout/Alert";

const Login = ({ login, isAuthenticated }) => {
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
      <h1 className="large">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <Alert></Alert>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <h4>Email:</h4>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Password:</h4>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-wide"
        />
      </form>
      <p className="m-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
