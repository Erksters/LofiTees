import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {SignUpServer, findSimilarUsername} from "../../api/api";
import swal from "sweetalert";

const SignUpPage = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  
  const HandleSubmit = () => {
    if(userNameError){swal("That Username is taken");return}
    if(userName === ""){swal("UserName cannot be empty"); return;}
    if(email === ""){swal("Email cannot be empty"); return;}
    if(lastName === ""){swal("Last Name cannot be empty"); return;}
    if(firstName === ""){swal("First Name cannot be empty"); return;}
    if(password === ""){swal("Password cannot be empty"); return;}
    if(password !== password2){swal("Passwords did not match!", "Both Passwords must match"); return;}
    
    const uploadData = new FormData();
    uploadData.append("username", userName);
    uploadData.append("password", password);
    uploadData.append("email", email);
    uploadData.append("first_name", firstName);
    uploadData.append("last_name", lastName);

        fetch(SignUpServer, {
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

  const HandleUserNameUniqueness = (target) => {
    fetch(`${findSimilarUsername}/${target}`, {method: "GET"})
    .then(res => {
        if(res.status === 400){setUserNameError(true);} 
        if(res.status === 404){setUserNameError(false); setUserName(target)}
    })
  }

  return (
    <>
      {/* On Large Screens */}
      <div className="d-none d-lg-block">
        <div className="p-2" style={{ textAlign: "center" }}>
          {userNameError && <label style={{color:"red"}}>This username is already taken</label>}
          <br/>
          <label className="pr-2">Enter Username</label>
          <input type="text" onChange={(e) => HandleUserNameUniqueness(e.target.value)} />
          <br/>
          <label className="pr-2">Enter First Name</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
          <br />
          <label className="pr-2">Enter Last Name</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
          <br />
          <label className="pr-2">Enter Email Address</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label className="pr-2">Enter Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <label className="pr-2">Re-Enter Password</label>
          <input type="text" onChange={(e) => setPassword2(e.target.value)} />
        </div>

        <div className="centerDiv">
          <Button onClick={HandleSubmit} size="lg">
            Sign Up
          </Button>
        </div>
      </div>
      {/* On small Screens */}
      <div className="d-lg-none">
        <div className="p-2" style={{ textAlign: "center" }}>
            <div className="p-2" style={{ textAlign: "center" }}>
            {userNameError && <label style={{color:"red"}}>This username is already taken</label>}
            <br/>
            <label className="pr-2">Enter Username</label>
            <input type="text" onChange={(e) => HandleUserNameUniqueness(e.target.value)} />
            <br/>
            <label className="pr-2">Enter First Name</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            <br />
            <label className="pr-2">Enter Last Name</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
            <br />    
            <label className="pr-2">Enter Email Address</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label className="pr-2">Enter Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <label className="pr-2">Re-Enter Password</label>
            <input type="text" onChange={(e) => setPassword2(e.target.value)} />
            </div>
          <Button href="/" size="lg" block>
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
