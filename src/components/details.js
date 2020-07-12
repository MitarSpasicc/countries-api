import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Loader from "./loader";

function CountryDetails({ match }) {
  const history = useHistory();
  console.log(match);
  const [data, getData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [match.params.id]);

  function formatPopulation(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchData = async () => {
    const data = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${match.params.id}`
    );
    const country = await data.json();
    getData(country);
    setLoading(false);
  };

  const goBack = () => history.goBack();
  console.log(data);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="buttonized">
        <button className="back-btn" onClick={goBack}>
          <i className="fa fa-chevron-left "></i>
          Back
        </button>
      </div>

      <div className="details">
        <div className="dtl-country-pic">
          <img src={data.flag} alt={data.flag + "flag"} />
        </div>
        <div className="country-info">
          <div className="dtl-country-info">
            <h1 className="countryName">{data.name}</h1>
            <div className="country-info-container">
              <ul className="country-info-list">
                <li>
                  Native Name:
                  <span>{data.nativeName}</span>
                </li>
                <li>
                  Population:
                  <span>{formatPopulation(data.population)}</span>
                </li>
                <li>
                  Region:
                  <span>{data.region}</span>
                </li>

                <li>
                  Sub Region:
                  <span>{data.subregion}</span>
                </li>

                <li>
                  Capital:
                  <span>{data.capital}</span>
                </li>
              </ul>

              <ul className="country-info-list">
                <li>
                  Top Level Domain:
                  <span>{data.topLevelDomain[0]}</span>
                </li>
                <li>
                  Currencies:
                  {data.currencies.map((c) => (
                    <span key={c.name}>{c.name},</span>
                  ))}
                </li>
                <li>
                  Lagnuages:
                  {data.languages.map((l) => (
                    <span key={l.name}>{l.name},</span>
                  ))}
                </li>
              </ul>
            </div>
            <div className="border-countries">
              <span>Border Countries:</span>

              {data.borders.map((l) => (
                <Link to={`/details/${l.toLowerCase()}`} key={l}>
                  <button className="border-btns">{l}</button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetails;
