import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className="d-none d-lg-block">
        <div className="App-header">
          <h1>LofiTees</h1>
          <p>Ad astra per aspera</p>
        </div>
      </div>

      <div className="d-lg-none">
        <div className="headerMobile">
          <h1>LofiTees</h1>
          <p>Ad astra per aspera</p>
        </div>
      </div>
    </Link>
  );
};

export default Header;
