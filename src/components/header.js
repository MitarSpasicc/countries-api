import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="where">
        <Link to="/" className="link">
          <h2>Where in the world?</h2>
        </Link>
      </div>

      <div className="theme">
        <i className="fa fa-moon-o"></i>
        <h5>Dark Mode</h5>
      </div>
    </div>
  );
}

export default Header;
