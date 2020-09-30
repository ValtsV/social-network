import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../redux/actions/profileActions";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Ahora"
        ) : (
          <Moment format="YYYY/MM">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger btn-table"
          onClick={() => deleteExperience(exp._id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experiencia</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="thcompany">Empresa</th>
            <th className="hide-sm thtitle">Puesto</th>
            <th className="hide-sm thyears">Años</th>
            <th className="thbutton button-table" />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
