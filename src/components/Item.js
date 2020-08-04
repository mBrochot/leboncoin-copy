import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <Link key={item._id} to={`/offer/${item._id}`}>
      {" "}
      <div className="item">
        <div className="item-pic">
          <img src={item.picture.url} alt={item.title} />
        </div>
        <div className="item-text">
          <div className="item-info">
            <span className="item-title">{item.title}</span>
            <span className="item-price">{item.price + " €"}</span>
          </div>
          <span className="item-date">
            {new Date(item.created).toLocaleString().substring(0, 18)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Item;
