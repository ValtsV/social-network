import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteAccount,
  getCurrentProfile,
} from "../../redux/actions/profileActions";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Tu perfil</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Bienvenido {user && user.name}
      </p>
      <Alert />
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteAccount();
              }}
            >
              <i className="fas fa-user minus"></i> Borrar mi cuenta
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Tiene que crear una cuenta primero!</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Crear Perfil
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
