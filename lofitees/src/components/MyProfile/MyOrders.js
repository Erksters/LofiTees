import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { myOrdersServer, myOrderlines } from "../../api/api";
import { Button, Card, Col, Row } from "react-bootstrap";
import MyOrderLines from "./MyOrderLines";

const MyOrders = (props) => {
  const myUsername = sessionStorage.getItem("lofiteesusername")
  const [myOrders , setMyOrders] = useState([])
  const [myOrderlines , setMyOrderlines] = useState([])
  console.log(" myOrders", myOrders)

  const loadOrderData = async () => {
    const uploadData = new FormData();
    uploadData.append("user_name", myUsername);
    await fetch(myOrdersServer, {
        method: "POST",
        body: uploadData
    })
      .then((res) => res.json())
      .then((body) =>
       setMyOrders([...body["results"]])
      )
      .catch((error) => {console.log("SOME ERROR")});
  };

  useEffect(() => {
    loadOrderData();
  }, []);

//   console.log("location", sessionStorage.getItem("lofiteeslocationprofile"));
  
  return (
    <>
      {/* Desktop */}
      <div className="d-none d-lg-block">
          {myOrders.map((order) => (
             <Card>
                <Card.Header>
                    <div style={{float:"left"}}>Shipping information</div>
                    <div style={{float:"right"}}>Order ID#{order.pk}</div>
                </Card.Header>
                <Card.Body>
                    <Col>
                        <Row>
                            <label style={{float:"left"}} >To: &nbsp;</label>
                            <div style={{float:"left"}}>{order.first_name} &nbsp;</div>
                            <div style={{float:"left"}}>{order.last_name}</div>
                        </Row>
                    
                        <Row>
                            <label style={{float:"left"}} >Address: &nbsp;</label>
                            <div style={{float:"left"}}>{order.street} &nbsp; </div>
                            <div style={{float:"left"}}>{order.street2} &nbsp;</div>
                            <div style={{float:"left"}}>{order.state}&nbsp;</div>
                            <div style={{float:"left"}}>{order.zipcode}&nbsp;</div>
                        </Row>
                        <Row>
                            <MyOrderLines MyOrderNumber={order.pk}/>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
          ))}
      </div>

      {/* Mobile */}
      <div className="d-lg-none">
        <Card>
            <Card.Header>

            </Card.Header>
            <Card.Body>
            
            </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MyOrders;
