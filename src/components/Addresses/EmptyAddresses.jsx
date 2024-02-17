import React from "react";
import { Link } from "react-router-dom";

function EmptyAddresses({imgWidth , imgHeight}) {
  return (
    <div className="addresses-empty">
      <img
        src={require("../../assets/images/empty-address.png")}
        alt="empty-img"
        className="img-fluid"
        width={imgWidth}
        height={imgHeight}
      />
      <p className="empty-text">
        There are no addresses saved , <Link to={"/add-address"}> add now</Link>
      </p>
    </div>
  );
}

export default EmptyAddresses;
