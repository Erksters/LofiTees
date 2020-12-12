import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { singleShirtByID, myServer } from "../../api/api";
import Loading from "../Loading/Loading";

const SingleItem = (props) => {
  const [thisShirt, setThisShirt] = useState(0);
  const item = props.shirtContents;

  const shirtIDs = sessionStorage.getItem("myCart");
  const splitList = shirtIDs.split(",");
  splitList.splice(splitList.length - 1, 1);

  console.log("Item", item)

  function removerHelper() {
    for(let i = 0; i < splitList.length; i++){
      if(splitList[i] === item["ID_Size"]){
        return i;
      }
    }
    return undefined;
  }

  const handleRemove = () =>{

    var deletionIndex = removerHelper()

    var newCart = "";
    if(splitList.length === 1){sessionStorage.setItem("myCart","")}
    for(let i = 0; i < splitList.length; i++){
      if(i !== deletionIndex){
        newCart = newCart + (splitList[i]) + ","
      }
    }
    sessionStorage.setItem("myCart", newCart);
    console.log("new Cart", newCart)
    window.location.href = "/my_cart"
    
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch(`${singleShirtByID}${item["ID_Size"].split(".")[0]}`)
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

  if (thisShirt === 0) {
    return <Loading finishedLoading={false} />;
  } else {
    return (
      <div className="centerDiv">
        <div>
          <img
            src={`${myServer}media/${thisShirt[0].img}`}
            alt="Whoops"
            width={200}
            height={200}
          />
        </div>

        <div style={{ fontSize: 32, alignSelf:"center" }}>&nbsp; X {item["amount"]} &nbsp;</div>

        <div style={{ fontSize: 32, alignSelf:"center" }}> {item["ID_Size"].split(".")[1]}</div>

        <Button onClick={handleRemove}>Remove One</Button>
        
      </div>
    );
  }
};

export default SingleItem;
