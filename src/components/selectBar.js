import React from "react";

function SelectBar(props) {
  return (
    <select
      value={props.selectedValue}
      onChange={props.selectedRegion}
      className="select-region"
    >
      <option value="all">All</option>
      <option value="europe">Europe</option>
      <option value="asia">Asia</option>
      <option value="americas">Americas</option>
      <option value="africa">Africa</option>
      <option value="oceania">Oceania</option>
    </select>
  );
}

export default SelectBar;
