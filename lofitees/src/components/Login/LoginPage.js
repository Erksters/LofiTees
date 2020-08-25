import React, { useState } from "react";
import { Button } from "react-bootstrap";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(userName);
  console.log(password);

  const HandleSubmit = () => {};

  return (
    <>
      {/* On small Screens */}
      <div className="d-none d-lg-block">
        <div className="p-2" style={{ textAlign: "center" }}>
          <label>Enter UserName</label>
          <textarea onChange={(e) => setUserName(e.target.value)} />
          <br />
          <label>Enter password</label>
          <textarea onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <Button onClick={HandleSubmit} size="lg">
            Submit
          </Button>
        </div>
      </div>
      {/* On small Screens */}
      <div className="d-lg-none">
        <div className="p-2" style={{ textAlign: "center" }}>
          <Button href="/" size="lg" block>
            Login
          </Button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "whitesmoke",
        }}
      ></div>
    </>
  );
};

export default LoginPage;
