import React, { useState, useEffect } from "react";
import axios from "axios";
import searchGlacesGrey from "../images/searchGlacesGrey.svg";
import Pagination from "../components/Pagination";
import loading from "../images/loading.svg";
import Item from "../components/Item";

const Offers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://le-bon-coin-api.herokuapp.com/offer/with-count"
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return isLoading ? (
    // <span>En cours de chargement... </span>
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <div className="offers">
      <div className="ellipsis-container">
        <div className="ellipsis-background"></div>
      </div>
      <div className="search-box">
        <div className="search-box-right">
          <div>
            <img
              className="searchGlacesGrey-box"
              src={searchGlacesGrey}
              alt="searchGlaces"
            />
            <input
              className="offersSearch"
              type="text"
              placeholder="Que cherchez-vous ?"
            />
          </div>
          <div>
            <span>Prix entre </span>
            <input className="priceInput" type="text" placeholder="prix min" />
            <span> et </span>
            <input className="priceInput" type="text" placeholder="prix min" />
          </div>
        </div>
        <div className="search-box-left">
          <button className="researchBtn">Rechercher</button>
          <input
            className="search-box-input"
            type="text"
            placeholder="Tri: Plus récentes"
          />
        </div>
      </div>
      <section className="offers-list">
        {currentPosts.map((item, index) => {
          return <Item item={item} />;
        })}
      </section>
      <Pagination
        count={data.length}
        skip={skip}
        setSkip={setSkip}
        limit={limit}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Offers;
