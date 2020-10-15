import React from "react";
import logo from "../images/leboncoin-logo.png";
import searchGlaces from "../images/searchGlaces.svg";
import plus from "../images/plus.svg";
import connectLogo from "../images/connectLogo.svg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = ({ hide, setHide, user, setUser }) => {
  const history = useHistory();
  return (
    <>
      <div className="headband">
        <div className="header">
          <div className="header-left">
            <Link key="home" to={`/`}>
              <img
                className="leboincoinLogo"
                src={logo}
                alt="logo-leboncoin"
              />
            </Link>
            <button
              className="postAnAd"
              onClick={() => {
                user ? history.push("/offer/publish") : setHide(!hide);
              }}
            >
              <img src={plus} alt="plus" />
              Déposer une annonce
            </button>
            <div className="research">
              <img src={searchGlaces} alt="searchGlaces" />
              <input type="text" placeholder="Rechercher" />
            </div>
          </div>

          {user === null ? (
            <div
              className="header-right"
              onClick={() => {
                setHide(!hide);
              }}
            >
              <img src={connectLogo} alt="connectLogo" />
              <span>Se connecter</span>
            </div>
          ) : (
            <div
              className="header-right"
              onClick={() => {
                Cookies.remove("token");
                setUser(null);
              }}
            >
              <img src={connectLogo} alt="connectLogo" />
              <span>Se déconnecter</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
