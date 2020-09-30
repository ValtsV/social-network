import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../redux/actions/profileActions";
import { removeAlerts } from "../../redux/actions/alertActions";

const AddExperience = ({ addExperience, history, removeAlerts }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <h1 className="large text-primary">Añade experiencia</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Añade puestos de programador que
        has tenido
      </p>
      <small>* = obligatorio</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Puesto"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Empresa"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Locación"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Desde</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Hasta</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Actual
          </p>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Descripción de puesto"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link
          className="btn my-1"
          to="/dashboard"
          onClick={() => removeAlerts()}
        >
          Volver
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  removeAlerts: PropTypes.func.isRequired,
};

export default connect(null, { addExperience, removeAlerts })(
  withRouter(AddExperience)
);
