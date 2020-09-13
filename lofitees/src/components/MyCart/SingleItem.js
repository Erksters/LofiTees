import React, { useEffect, useState } from "react";
import { singleShirtByID, myServer } from "../../api/api";
import Loading from "../Loading/Loading";

const SingleItem = (props) => {
  const [thisShirt, setThisShirt] = useState(0);
  const item = props.shirtContents;

  useEffect(() => {
    loadData();
  });

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

        <div style={{ fontSize: 32 }}>X {item["amount"]}</div>

        <div> {item["ID_Size"].split(".")[1]}</div>
      </div>
    );
  }
};

export default SingleItem;
