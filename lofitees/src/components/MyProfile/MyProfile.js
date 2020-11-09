import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { myProfileServer } from "../../api/api";
import { Button, Card } from "react-bootstrap";
import { findToken } from "../../api/api";

const MyProfile = (props) => {
  const myUsername = sessionStorage.getItem("lofiteesusername")
  const myToken = findToken;
  console.log("MY TOKEN", myToken)

  const loadData = async () => {
    await fetch(myProfileServer)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Unload Data
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log("location", sessionStorage.getItem("lofiteeslocationprofile"));
  
  if (!myToken) {
    window.location.href = "/"
}
  return (
    <>
      {/* Desktop */}
      <div className="d-none d-lg-block">
        <div style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
        Welcome back {myUsername}
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
