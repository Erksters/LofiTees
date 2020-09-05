import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage";
import SingleShirt from "./components/SingleShirt/SingleShirt";

const App = () => {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/order">
            <>order</>
          </Route>

          <Route exact path="/confirmation">
            <>
              hey you just completed an order! Here's some details <br /> Buy
              more stuff <br />
              Or you're here by accident, re-route to /<br />
            </>
          </Route>

          <Route exact path="/myorders">
            <>
              <>
                My Orders <br />
              </>
              Check if signed in or return to singin
            </>
          </Route>

          <Route path="/:id" component={SingleShirt}></Route>
          <Route exact path="/" name="Home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
