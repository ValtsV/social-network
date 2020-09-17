import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const { password, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("success");
  };

  return (
    <Fragment>
      <h1 class="large">Login</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Sign Into Your Account
      </p>
      <form class="form" onSubmit={(e) => onSubmit}>
        <div class="form-group">
          <h4>Email:</h4>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>Password:</h4>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minlength="6"
          />
        </div>

        <input type="submit" value="Login" class="btn btn-primary btn-wide" />
      </form>
      <p class="m-1">
        Don't have an account? <Link href="register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
