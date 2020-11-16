import React, { useState, useEffect } from "react";
import { myProfileServer } from "../../api/api";
import { Button, Card } from "react-bootstrap";
import { findToken } from "../../api/api";
import MyOrders from "./MyOrders";

const MyProfile = (props) => {
  const myUsername = sessionStorage.getItem("lofiteesusername");
  const [myProfileData , setMyProfileData] = useState([]);

  const loadProfileData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${findToken}`);
    await fetch(myProfileServer, {
      method: "POST",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((body) =>{
          // console.log("Body", body)
        setMyProfileData([...body])
      }
       
      )
      .catch((error) => {console.log("SOME ERROR")});
  };

  useEffect(() => {
    loadProfileData();
  }, []);
  console.log("My Profile Data" ,myProfileData)

//   console.log("location", sessionStorage.getItem("lofiteeslocationprofile"));
  
  if (!findToken) {
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
