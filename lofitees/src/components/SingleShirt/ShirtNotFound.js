import React from "react";

import { Button } from "react-bootstrap";
import "./SingleShirt.css";

const ShirtNotFound = (props) => {
  return (
    <>
      <div
        className="centerDiv"
        style={{
          backgroundColor: "lightyellow",
          height: 150,
          alignItems: "center",
        }}
      >
        We didn't find the shirt you were looking for. Check your URL and try
        again! Otherwise the shirt may have been discontinued.
      </div>
      <div className="centerDiv p-3" style={{ backgroundColor: "lightyellow" }}>
        <Button href="/" size="lg">
          Return Home
        </Button>
      </div>
    </>
  );
};

export default ShirtNotFound;
