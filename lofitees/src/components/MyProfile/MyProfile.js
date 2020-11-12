import React, { useState, useEffect } from "react";
import { myProfileServer, myOrdersServer } from "../../api/api";
import { Button, Card } from "react-bootstrap";
import { findToken } from "../../api/api";
import MyOrders from "./MyOrders";

const MyProfile = (props) => {
  const myUsername = sessionStorage.getItem("lofiteesusername")
  const myToken = findToken;
//   console.log("MY TOKEN", myToken)
//   console.log("MY UserName", myUsername)

//   const loadOrderData = async () => {
//     const uploadData = new FormData();
//     uploadData.append("user_name", myUsername);
//     console.log("AWAITING???", myOrdersServer)
//     await fetch(myOrdersServer, {
//         method: "POST",
//         body: uploadData
//     })
//       .then((res) => res.json())
//       .then((body) =>
//        setMyOrders([...body["results"]])
//       )
//       .catch((error) => {console.log("SOME ERROR")});
//   };

  useEffect(() => {
    // loadOrderData();
  }, []);

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
            <Card.Header>Your Orders Summary</Card.Header>
            <Card.Body>
                <MyOrders />
            </Card.Body>
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
