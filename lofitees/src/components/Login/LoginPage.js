import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { loginServer } from "../../api/api";
import swal from "sweetalert";
const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const HandleSubmit = () => {
    const uploadData = new FormData();
    uploadData.append("username", userName);
    uploadData.append("password", password);

    fetch(loginServer, {
      method: "POST",
      body: uploadData,
    })
      .then((res) => res.json())
      .then((body) => {
        sessionStorage.setItem("lofiteestoken", body["token"]);
        sessionStorage.setItem("lofiteesusername", body["username"]);
        sessionStorage.setItem(
          "lofiteeslocationprofile",
          JSON.parse(body["locationprofile"])
        );
        window.location = "/my_profile";
      })
      .catch((error) => {
        swal("Oops!", "Check your username and password and try again!");
      });
  };

  return (
    <>
      {/* On Large Screens */}
      <div className="d-none d-lg-block">
        <div className="p-2" style={{ textAlign: "center" }}>
          <label className="pr-2">Enter a Username</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
          <br />
          <label className="pr-2">Enter password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />

        </div>

        <div className="centerDiv">
          <Button onClick={HandleSubmit} size="lg">
            Sign In
          </Button>
        </div>
      </div>
      {/* On small Screens */}
      <div className="d-lg-none">
        <div className="p-2" style={{ textAlign: "center" }}>
          <Button href="/" size="lg" block>
            Sign In
          </Button>
        </div>
      </div>

    </>
  );
};

export default LoginPage;
