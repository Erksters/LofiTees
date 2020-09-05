import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
// import ProfileNotFound from "../ProfileNotFound/ProfileNotFound";
import { singleShirt, myServer } from "../../api/api";
import "./SingleShirt.css";
import ShirtNotFound from "./ShirtNotFound";

const SingleShirt = (props) => {
  //   window.document.title = props.match.params.id;
  const [thisShirt, setThisShirt] = useState(0);

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
      </>
    );
  }
};

export default SingleShirt;
