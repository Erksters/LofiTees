import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { myProfileServer, myOrders, myOrderlines } from "../../api/api";
import { Button, Card } from "react-bootstrap";
import { findToken } from "../../api/api";

const MyProfile = (props) => {
  const myUsername = sessionStorage.getItem("lofiteesusername")
  const myToken = findToken;
  const [myOrders , setMyOrders] = useState([])
  const [myOrderlines , setMyOrderlines] = useState([])
  console.log("MY TOKEN", myToken)
  console.log("MY UserName", myUsername)

  const loadOrderData = async () => {
    const uploadData = new FormData();
    uploadData.append("user_name", myUsername);
    console.log("AWAITING???")
    await fetch(myOrders, {
        method: "GET",
        body: uploadData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log("Some data", data)
        setMyOrders([])
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadOrderData();
  });

//   console.log("location", sessionStorage.getItem("lofiteeslocationprofile"));
  
  if (!myToken) {
    window.location.href = "/"
  }
  return (
    <>
      {/* Desktop */}
      <div className="d-none d-lg-block">
        <div style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
        Welcome back {myUsername}
        <Card>
            <Card.Header>Hello</Card.Header>
        </Card>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none">
        <div style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
        Welcome back <br />{myUsername}

        </div>
      </div>
    </>
  );
};

export default MyProfile;
