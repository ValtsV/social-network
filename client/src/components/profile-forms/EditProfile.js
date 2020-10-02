import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
} from "../../redux/actions/profileActions";
import { Link, withRouter } from "react-router-dom";
import Alert from "../layout/Alert";
import { removeAlerts } from "../../redux/actions/alertActions";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  removeAlerts,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Crea tu perfil</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Añade información sobre ti
      </p>

      <small>* = obligatorio</small>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <p>* Ocupación</p>
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">Elige uno</option>
            <option value="Developer">Desarollador</option>
            <option value="Junior Developer">Desarollador Junior</option>
            <option value="Senior Developer">Desarollador Senior</option>
            <option value="Manager">Tech Lead</option>
            <option value="Student or Learning">Estudiante</option>
            <option value="Instructor">Instructor o profesor</option>
            <option value="Intern">Practicante</option>
            <option value="Other">Otro</option>
          </select>
          {/* <small className="form-text">Añade información sobre tu puesto</small> */}
        </div>
        <div className="form-group">
          <p>Empresa</p>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Puede ser tu propia empresa o tu empleadora
          </small>
        </div>
        <div className="form-group">
          <p>Página Web</p>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Puede ser tu propia web o la de tu empleadora
          </small>
        </div>
        <div className="form-group">
          <p>Locación</p>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>* Habilidades</p>
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Por favor separa cada habilidad con coma (HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <p>Usuario de Github</p>
          <input
            type="text"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Si quieres mostrar tus últimos repos y enlace a tu perfil de GitHub,
            añade tu usuario
          </small>
        </div>
        <div className="form-group">
          <p>Información sobre ti</p>
          <textarea
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Añadir cuentas sociales
          </button>
          <span>Opcional</span>
        </div>

        {displaySocialInputs ? (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        ) : null}
        <Alert></Alert>
        <input type="submit" value="Subir" className="btn btn-primary my-1" />
        <Link
          className="btn btn-light my-1"
          to="/dashboard"
          onClick={() => removeAlerts()}
        >
          Volver
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  removeAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  removeAlerts,
})(withRouter(EditProfile));
