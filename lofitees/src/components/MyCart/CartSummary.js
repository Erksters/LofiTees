import React from "react";
import { Card } from "react-bootstrap";

const CartSummary = (props) => {
  const shirtIDs = sessionStorage.getItem("myCart");
  const splitList = shirtIDs.split(",");
  splitList.splice(splitList.length - 1, 1);

  console.log(shirtIDs);
  console.log("HI", splitList);

  var res = Array.from(new Set(splitList)).map((a) => ({
    name: a,
    y: splitList.filter((f) => f === a).length,
  }));

  console.log(res);

  return (
    <Card>
      <Card.Header>Summary</Card.Header>
      <Card.Body>{}</Card.Body>
    </Card>
  );
};

export default CartSummary;
