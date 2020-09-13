import React, { useState, useEffect, useRef } from "react";
import {
  createOrderNoLocationProfile,
  findLocationProfile,
} from "../../api/api";
import swal from "sweetalert";
import { Button } from "react-bootstrap";
import CartSummary from "./CartSummary";

const ShowMyCart = (props) => {
  const [goodToPush, setGoodToPush] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  let paypalRef = useRef();

  const [loaded, setLoaded] = useState(false);
  const product = {
    price: 19.99,
    description: `Purchase shirts with free shipping and handling`,
  };

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
                      value: "19.99",
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
              //   uploadData.append("first_name", firstName);
              //   uploadData.append("last_name", lastName);
              //   uploadData.append("email", userEmail);
              //   uploadData.append("email", userEmail);
              //   uploadData.append("street", userStreet);
              //   uploadData.append("street2", userStreet2);
              //   uploadData.append("state", userState);
              //   uploadData.append("zipcode", userZipcode);
              //   uploadData.append("quantity", quantity);
              //   uploadData.append("shirtID", thisShirt.pk);

              fetch(createOrderNoLocationProfile, {
                method: "POST",
                body: uploadData,
              })
                .then((res) => {
                  if (res.status === 201) {
                    swal("An email confirmation has been sent to ${userEmail}");
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
      <h1>Ready to Check Out?</h1>
      <CartSummary />
      <div className="centerDiv">
        <div ref={(v) => (paypalRef = v)}></div>;
      </div>
    </>
  );
};

export default ShowMyCart;
