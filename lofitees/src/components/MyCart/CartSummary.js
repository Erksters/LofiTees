import React from "react";
import { Card } from "react-bootstrap";
import SingleItem from "./SingleItem";

const CartSummary = (props) => {
  const shirtIDs = sessionStorage.getItem("myCart");
  const splitList = shirtIDs.split(",");
  splitList.splice(splitList.length - 1, 1);

  var res = Array.from(new Set(splitList)).map((a) => ({
    ID_Size: a,
    amount: splitList.filter((f) => f === a).length,
  }));

  return (
    <div>
      <Card className="m-2" style={{ width: 600 }}>
        <Card.Header>
          <h3 style={{ textAlign: "center" }}>Summary</h3>
        </Card.Header>
        <Card.Body>
          {res.map((item, index) => (
            <SingleItem key={index} shirtContents={item} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartSummary;
