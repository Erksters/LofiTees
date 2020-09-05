import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { allShirts, myServer } from "../../api/api";
import { Button, Card } from "react-bootstrap";
import { findToken } from "../../api/api";

const Home = (props) => {
  const [shirts, setShirts] = useState([]);

  console.log(findToken);
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

  if (!shirts.length) {
    return <Loading />;
  }
  return (
    <>
      {/* Desktop */}
      <div className="d-none d-lg-block">
        <div style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
          Check Out Our <br />
          Latest Designs
        </div>
        <div>
          {shirts.map((shirt) => (
            <Card
              key={shirt.title}
              className="m-3"
              style={{
                width: 500,
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <Card.Header>{shirt.title}</Card.Header>
              <Card.Body>
                <img
                  src={`${myServer}media/${shirt.img}`}
                  alt="whoops"
                  width={400}
                  height={400}
                />
                <br />
                <div style={{ textAlign: "center" }}>{shirt.description}</div>
              </Card.Body>
              <Card.Footer>
                <Button href={`${shirt.title}`}>See More Details</Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile */}
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
