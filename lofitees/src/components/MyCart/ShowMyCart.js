import React, { useState, useEffect, useRef } from "react";
import {
  createOrderNoLocationProfile,
  findLocationProfile,
  findToken,
  findUsername,
} from "../../api/api";
import swal from "sweetalert";
import { Button, Card, Col, Row } from "react-bootstrap";
import CartSummary from "./CartSummary";

const ShowMyCart = (props) => {
  const [goodToPush, setGoodToPush] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const shirtIDs = sessionStorage.getItem("myCart");
  var splitList;
  if(shirtIDs === null ){
    splitList = [];
  }
  else{ 
    splitList = shirtIDs.split(",");
  }
  
  splitList.splice(splitList.length - 1, 1);

  var num = (19.99 * splitList.length * 1.07).toFixed(2)

  let paypalRef = useRef();

  const [loaded, setLoaded] = useState(false);
  const product = {
    price: num,
    description: `Purchase shirts with free shipping and handling`,
  };

  const handleDataCheck = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      userEmail === "" ||
      street === "" ||
      state === "" ||
      zipcode === ""
    ) {
      setGoodToPush(false);
      return false;
    } else {
      setGoodToPush(true);
    }
  };

  console.log(splitList);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AfsUrrkMHHS-EuHdj4KHBRddCVaMftup8lc7rq-bCqiK4LqAPzD6ddcpbVBtP_nrD8-VB0QNhPt5wnrS"; // Testing
    //   "https://www.paypal.com/sdk/js?client-id=AQbDEBZYLzd4M2xJhdE0JqVRRaVAtIbL1eGUAd7Y5HY96y4TdjW-T56qvuUhJ7mn29ZKVRmHzcpRSTpO";

    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: "USD",
                      value: `${product.price.toString()}`,
                    },
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              });
            },

            onApprove: (data, actions) => {
              // console.log(actions.order.capture());
              const uploadData = new FormData();
              uploadData.append("first_name", firstName);
              uploadData.append("last_name", lastName);
              uploadData.append("email", userEmail);
              uploadData.append("street", street);
              uploadData.append("street2", street2);
              uploadData.append("state", state);
              uploadData.append("zipcode", zipcode);
              uploadData.append("lines", splitList);

              if(findUsername){
                uploadData.append("user_name", findUsername)
              }

              fetch(createOrderNoLocationProfile, {
                method: "POST",
                body: uploadData,
              })
                .then((res) => {
                  if (res.status === 200) {
                    swal(`An email confirmation has been sent to ${userEmail}`);
                  }
                })
                .catch((err) => console.log("ERROR ", err));
            },
          })
          .render(paypalRef);
      }, 1000);
    }
  });

  if (
    sessionStorage.getItem("myCart") === null ||
    sessionStorage.getItem("myCart") === ""
  ) {
    return (
      <>
        <div className="centerDiv">
          You haven't added anything to your cart.
        </div>
        <div className="centerDiv">
          <Button href="/">See all shirts available</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="centerDiv">
        <Card className="m-2">
          <Card.Header>
            <h3 style={{ textAlign: "center" }}>Add an Address</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <label className="pr-2">Street address</label> <br />
                <input
                  type="text"
                  onChange={(e) => setStreet(e.target.value)}
                />
                <br />
                <label className="pr-2">Street address 2</label> <br />
                <input
                  type="text"
                  onChange={(e) => setStreet2(e.target.value)}
                />
                <br />
                <label className="pr-2">Zipcode</label> <br />
                <input
                  type="text"
                  onChange={(e) => setZipcode(e.target.value)}
                />
                <br />
                <label className="pr-2">State</label> <br />
                <input type="text" onChange={(e) => setState(e.target.value)} />
              </Col>
              <Col>
                <label className="pr-2">First Name</label> <br />
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <label className="pr-2">Last Name</label> <br />
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <label className="pr-2">Email</label> <br />
                <input
                  type="text"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <br />
              </Col>

              <Col>
                <label className="pr-2"> Special Instructions</label>
                <input type="text" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="centerDiv">
        <CartSummary />
        <Card className="m-2" style={{ width: 300 }}>
          <Card.Header>Price Breakdown</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={6}>Price per Shirt</Col>
              <Col>$19.99</Col>
            </Row>

            <Row>
              <Col xs={6}>Quantity</Col>
              <Col>X {splitList.length}</Col>
            </Row>

            <Row>
              <Col xs={6}>Tax</Col>
              <Col>{7}%</Col>
            </Row>

            <Row>
              <Col>______________________________</Col>
            </Row>

            <Row>
              <Col xs={6}></Col>
              <Col>X {(splitList.length * 19.99 * 1.07).toFixed(2)}</Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Button block onClick={handleDataCheck}>
              Order Now
            </Button>
          </Card.Footer>
        </Card>
      </div>

      <div className="centerDiv">
        {goodToPush && <div ref={(v) => (paypalRef = v)}></div>}
      </div>
    </>
  );
};

export default ShowMyCart;
