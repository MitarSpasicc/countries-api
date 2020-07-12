import React from "react";
import { Link } from "react-router-dom";

function Countries(props) {
  const formatPopulation = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Link
      to={`/details/${props.data.alpha3Code.toLowerCase()}`}
      className="link"
    >
      <div className="country">
        <div className="country-pic">
          <img src={props.data.flag} alt={props.data.flag + "flag"} />
        </div>
        <div className="about-country">
          <h3 className="country-name">{props.data.name}</h3>
          <p>
            <span>Population: </span>
            {formatPopulation(props.data.population)}
          </p>
          <p>
            <span>Region: </span>
            {props.data.region}
          </p>
          <p>
            <span>Capital: </span>
            {props.data.capital}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Countries;
