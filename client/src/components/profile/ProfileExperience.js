import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YY/MM">{from}</Moment> -{" "}
      {!to ? " Ahora" : <Moment format="MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Posición: </strong>
      {title}
    </p>
    <p>
      <strong>Descripción: </strong>
      {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
