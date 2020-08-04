import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clock from "../images/clock.svg";
import bell from "../images/bell.svg";
import eye from "../images/eye.svg";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (username && email && password === confirmPassword && check) {
        const response = await axios.post(
          `https://le-bon-coin-api.herokuapp.com/user/sign_up`,
          {
            username: username,
            email: email,
            password: password,
          }
        );

        Cookies.set("token", response.data.token, {
          expires: 7,
        });
        setUser(response.data.token);
        history.push("/");
      } else if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe ne sont pas identiques");
      } else if (!check) {
        setErrorMessage("Vous n'avez pas accepté les Conditions Générales");
      } else {
        setErrorMessage("Des informations sont manquantes ou incorectes");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Cet email existe déjà");
        } else if (error.response.status === 400) {
          setErrorMessage("Vous n'avez pas remplis tout le formulaire");
        } else {
          alert("Erreur");
        }
      }
    }
  };

  return (
    <div className="singUp">
      <div className="info">
        <h2>Pourquoi créer un compte ?</h2>
        <div className="clock">
          <img src={clock} alt="clock" />
          <div className="clock-text">
            <span>Gagnez du temps</span>
            <p>
              Publiez vos annonces rapidement, avec vos informations
              pré-remplies chaque fois que vous souhaitez déposer une nouvelle
              annonce.
            </p>
          </div>
        </div>
        <div className="bell">
          <img src={bell} alt="bell" />
          <div className="bell-text">
            <span>Soyez les premiers informés</span>
            <p>
              Créez des alertes Immo ou Emploi et ne manquez jamais l'annonce
              qui vous intérresse.
            </p>
          </div>
        </div>
        <div className="eye">
          <img src={eye} alt="eye" />
          <div className="eye-text">
            <span>Visibilité</span>
            <p>
              Suivez les statistiques de vos annonces (nombre de fois où voutre
              annonce a été vue, nombre de contacts reçus).
            </p>
          </div>
        </div>
      </div>
      <div className="form">
        <h2>Créez un compte</h2>
        <div className="orange-line"></div>
        <span className="signUpError">{errorMessage}</span>
        <form onSubmit={handleSubmit}>
          <div className="formbox1">
            <span>Pseudo &#42;</span>
            <br />
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <br />
            <span>Adresse email &#42;</span>
            <br />
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="password">
            <div className="password1">
              <span>Mot de passe &#42;</span>
              <br />
              <input
                type="password"
                id="myInput1"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {eye1 === true ? (
                <FontAwesomeIcon
                  id="eye1"
                  icon="eye"
                  onClick={() => {
                    setEye1(false);
                    var x = document.getElementById("myInput1");
                    x.type = "text";
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  id="eye1"
                  icon="eye-slash"
                  onClick={() => {
                    setEye1(true);
                    var x = document.getElementById("myInput1");
                    x.type = "password";
                  }}
                />
              )}
            </div>

            <div className="password2">
              <span>Confirmez le mot de passe &#42;</span>
              <br />
              <input
                className={confirmPassword !== password ? "unvalid" : "valid"}
                type="password"
                id="myInput2"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
              {eye2 === true ? (
                <FontAwesomeIcon
                  id="eye2"
                  icon="eye"
                  onClick={() => {
                    setEye2(false);
                    var y = document.getElementById("myInput2");
                    y.type = "text";
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  id="eye2"
                  icon="eye-slash"
                  onClick={() => {
                    setEye2(true);
                    var y = document.getElementById("myInput2");
                    y.type = "password";
                  }}
                />
              )}
            </div>
          </div>
          <div className="general-conditions">
            {check === false ? (
              <i
                class="far fa-square"
                onClick={() => {
                  setCheck(!check);
                }}
              ></i>
            ) : (
              <i
                class="far fa-check-square"
                onClick={() => {
                  setCheck(!check);
                }}
              ></i>
            )}
            <p>
              &#8810; J'accepte les{" "}
              <span className="blue-text">Conditions Générales de Vente</span>{" "}
              et les{" "}
              <span className="blue-text">
                Conditions Générales d'Utilisation
              </span>{" "}
              &#8811;
            </p>
          </div>
          <button className="form-btn" type="submit">
            Créer mon compte personnel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
