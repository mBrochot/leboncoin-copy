import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogIn = ({ hide, setHide, setUser }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email && password) {
        const response = await axios.post(
          `https://le-bon-coin-api.herokuapp.com/user/log_in`,
          { email: email, password: password }
        );
        if (response.data.token !== null) {
          Cookies.set("token", response.data.token, { expires: 7 });
          setUser({ token: response.data.token });
          setHide(false);
        }
      } else {
        setErrorMessage("Vous n'avez pas rempli tous les champs.");
      }
    } catch (error) {
      if (error.response.status === 400 || 401) {
        setErrorMessage(
          "L'adresse mail et/ou mot de passe ne sont pas valide."
        );
      }
    }
  };

  return (
    <div
      id="connect-modale"
      onClick={(event) => {
        var modal = document.getElementById("connect-modale");
        if (event.target === modal) {
          setHide(!hide);
        }
      }}
    >
      <div id="connect">
        <form onSubmit={handleSubmit}>
          <div className="connect-title">
            <h1>Bonjour !</h1>
            <br />
            <span className="connect-msg">
              Connectez-vous pour découvrir toutes nos fonctionnalités.
            </span>
            <br />
            <span className="connectError">{errorMessage}</span>
          </div>
          <div className="connect-form">
            <span className="connect-form-span">E-mail</span>
            <br />
            <input
              type="email"
              className="connect-email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <span className="connect-form-span">Mot de Passe</span>
            <br />
            <input
              type="password"
              className="connect-password"
              id="myInput"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {eye === true ? (
              <FontAwesomeIcon
                id="eye"
                icon="eye"
                onClick={() => {
                  setEye(false);
                  var x = document.getElementById("myInput");
                  x.type = "text";
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="eye"
                icon="eye-slash"
                onClick={() => {
                  setEye(true);
                  var x = document.getElementById("myInput");
                  x.type = "password";
                }}
              />
            )}
            <br />
            <span className="missing-password">Mot de passe oublié</span>
          </div>
          <div className="connect-validation">
            <button type="submit" className="connect-button">
              Se connecter
            </button>
            <section>
              <span className="connect-question">
                Envie de nous rejoindre ?
              </span>
              <span
                className="connect-create"
                onClick={() => {
                  history.push("/user/sign_up");
                  setHide(false);
                }}
              >
                &nbsp;Créer un compte
              </span>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
