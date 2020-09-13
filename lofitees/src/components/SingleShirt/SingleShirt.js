import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { singleShirt, myServer } from "../../api/api";
import "./SingleShirt.css";
import ShirtNotFound from "./ShirtNotFound";
import swal from "sweetalert";
import { Button } from "react-bootstrap";

const SingleShirt = (props) => {
  //   window.document.title = props.match.params.id;
  const [thisShirt, setThisShirt] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Large");
  const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sizeArray = ["Small", "Medium", "Large"];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch(`${singleShirt}${props.match.params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setThisShirt([...data]);
        } else {
          setThisShirt(404);
        }
      })
      .catch((error) => {});
  };

  console.log(thisShirt);
  const addToCart = () => {
    if (sessionStorage.getItem("myCart") === null) {
      sessionStorage.setItem("myCart", "");
    }
    for (let i = 0; i < quantity; i++) {
      sessionStorage.setItem(
        "myCart",
        sessionStorage
          .getItem("myCart")
          .concat(thisShirt[0].pk + "." + size + ",")
      );
    }

    swal(`You added "${thisShirt[0].title}" t-shirt to your cart!`);
  };

  if (thisShirt === 0) {
    return <Loading finishedLoading={false} />;
  } else if (thisShirt === 404) {
    return <ShirtNotFound />;
  } else {
    return (
      <>
        <div className="centerDiv singleBooTitle">
          <h2>{thisShirt[0].title}</h2>
        </div>
        <div className="centerDiv ">
          <img
            src={`${myServer}media/${thisShirt[0].img}`}
            alt="Whoops"
            width={400}
            height={400}
          />
        </div>
        <div className="centerDiv">
          <div className="descriptionDisplay">{thisShirt[0].description}</div>
        </div>

        <div className="centerDiv">
          <div>Select Quantity</div>
          <select
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {quantityArray.map((digit) => (
              <option key={digit} value={digit}>
                {digit.toString()}
              </option>
            ))}
          </select>
        </div>

        <div className="centerDiv">
          <div>Select Size</div>
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {sizeArray.map((lettercode) => (
              <option key={lettercode} value={lettercode}>
                {lettercode}
              </option>
            ))}
          </select>
        </div>
        <div className="centerDiv">
          <Button onClick={addToCart}>Add to Cart</Button>
        </div>
      </>
    );
  }
};

export default SingleShirt;
