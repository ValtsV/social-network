import React, { Fragment, useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form action="dashboard.html" className="form">
        <div className="form-group">
          <h4>Name:</h4>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>Email:</h4>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar as profile image
          </small>
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
        <div className="form-group">
          <h4>Confirm password:</h4>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-wide"
        />
      </form>
      <p className="m-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
