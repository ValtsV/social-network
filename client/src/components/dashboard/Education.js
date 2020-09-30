import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../redux/actions/profileActions";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Ahora"
        ) : (
          <Moment format="YYYY/MM">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger btn-table"
          onClick={() => deleteEducation(edu._id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Educación</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="thcompany">Escuela</th>
            <th className="hide-sm thtitle">Título</th>
            <th className="hide-sm thyears">Años</th>
            <th className="thbutton button-table" />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default connect(null, { deleteEducation })(Education);
