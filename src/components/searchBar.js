import React from "react";

function SearchBar(props) {
  return (
    <>
      <i className="fa fa-search fa-1x"></i>
      <input
        name="search"
        className="search-input"
        autoComplete="off"
        placeholder="Search for a country"
        type="text"
        value={props.searchInput}
        onChange={props.searchCountry}
      />
    </>
  );
}
export default SearchBar;
