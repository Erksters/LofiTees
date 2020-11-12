import React, { useEffect, useState } from "react";
import { singleShirtByID, myServer } from "../../api/api";
import Loading from "../Loading/Loading";

const DisplayOrderLineImg = (props) => {
  const [thisShirt, setThisShirt] = useState(0);
  const item = props.shirtID;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch(`${singleShirtByID}${item}`)
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
          <img
            src={`${myServer}media/${thisShirt[0].img}`}
            alt="Whoops"
            width={200}
            height={200}
          />
      </div>
    );
  }
};

export default DisplayOrderLineImg;
