import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Social Network</h1>
          <p className="lead">
            Create developer profile, share posts and connect with others
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              Sign Up
            </a>
            <a href="login.html" className="btn">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
