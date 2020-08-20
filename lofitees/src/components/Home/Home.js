import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { allShirts } from "../../api/api";
import { Button } from "react-bootstrap";

const Home = (props) => {
  const [shirts, setShirts] = useState([]);

  const loadData = async () => {
    await fetch(allShirts)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShirts([...data]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log("all shirts", shirts);

  // if (!shirts.length) {
  //   return <Loading />;
  // }
  return (
    <>
      <div className="d-none d-lg-block">
        <div style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
          Check Out Our <br />
          Latest Designs
        </div>
      </div>

      <div className="d-lg-none">
        <div style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
          Check Out Our <br />
          Latest Designs
        </div>
      </div>
    </>
  );
};

export default Home;
