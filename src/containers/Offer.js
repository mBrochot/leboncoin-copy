import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import shoppingCart from "../images/shoppingCart.svg";
import loading from "../images/loading.svg";

const Offer = ({ hide, setHide, user, setUser }) => {
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://le-bon-coin-api.herokuapp.com/offer/${id}`
      );
      Cookies.set("offer", response.data, { expires: 1 });
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="" loader />
    </div>
  ) : (
    <div className="offer">
      <section>
        <div className="card">
          <div className="card-img">
            <img src={data.picture.url} alt={data.title} />
          </div>

          <div className="card-text">
            <div className="card-info">
              <span className="card-title">{data.title}</span>
              <span className="card-price">{data.price + " €"}</span>
            </div>
            <span className="card-date">
              {new Date(data.created).toLocaleString().substring(0, 18)}
            </span>
          </div>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>{data.description}</p>
        </div>
      </section>
      <section>
        <div className="user-card">
          <div className="user-info">
            <h2>{data.creator.account.username}</h2>
            <span className="user-ad-count">X&#160;annonces en ligne</span>
          </div>
          <button
            className="buyBtn"
            onClick={() => {
              user ? history.push("/pay") : setHide(!hide);
            }}
          >
            <img src={shoppingCart} alt="shoppingCart" />
            &#160;Acheter
          </button>
        </div>
      </section>
    </div>
  );
};

export default Offer;
