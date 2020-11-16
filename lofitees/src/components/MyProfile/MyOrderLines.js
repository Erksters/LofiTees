import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { myOrderlinesServer } from "../../api/api";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Collapse } from 'reactstrap';
import DisplayOrderLineImg from "../MyCart/DisplayOrderLineImg";

const MyOrderLines = (props) => {
  const {MyOrderNumber } = props
  const [myOrderlines , setMyOrderlines] = useState([]);
  const [open , setOpen] = useState(false);
  console.log(" MyOrderNumber", MyOrderNumber);

  console.log(" MyOrderLines", myOrderlines);

  const loadOrderData = async () => {
    const uploadData = new FormData();
    uploadData.append("order_number", MyOrderNumber);
    await fetch(myOrderlinesServer, {
        method: "POST",
        body: uploadData
    })
      .then((res) => res.json())
      .then((body) =>
      setMyOrderlines([...body["results"]])
      )
      .catch((error) => {console.log("SOME ERROR")});
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  const HandleOpen = () => {
      setOpen(!open)
  }
//   console.log("location", sessionStorage.getItem("lofiteeslocationprofile"));
  
  return (
    <>
      {/* Desktop */}
      <div className="d-none d-lg-block">
        <Button onClick={HandleOpen}>View Details</Button>
        <Collapse isOpen={open}>
            {myOrderlines.map(orderline => (
                <div>
                    <Row>
                        <Col>
                            <Row>
                        <Col>
                            Size
                        </Col>
                        <Col>
                            {orderline.size}
                        </Col>
                    </Row>            
                        </Col>
                        <Col>
                            <DisplayOrderLineImg shirtID={orderline.shirt_id} />
                        </Col>
                    </Row>
                </div>
                
            ))}
        </Collapse>
    </div>

      {/* Mobile */}
      <div className="d-lg-none">

      </div>
    </>
  );
};

export default MyOrderLines;
