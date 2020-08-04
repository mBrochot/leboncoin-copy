import React, { useState } from "react";
import Cookies from "js-cookie";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Payment = () => {
  const offer = Cookies.getJSON("offer");
  console.log(offer);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeToken = await stripe.createToken(cardElement, {
      name: offer.creator.account.username,
    });

    const response = await axios.post(
      "https://le-bon-coin-api.herokuapp.com/pay",
      {
        stripeToken: stripeToken.token.id,
        amount: offer.price,
        currency: "eur",
        description: offer.title,
      }
    );

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <div>
      {completed ? (
        <p>Paiement effectué !</p>
      ) : (
        <div className="payBox">
          <div className="purchased-object">
            <img src={offer.picture.url} alt="picture" />
            <div>{offer.title}</div>
            <div className="payBox-price">{offer.price + " €"}</div>
          </div>
          <div className="payment">
            <form onSubmit={handleSubmit}>
              <div class="form-row">
                <label className="card-title" for="card-element">
                  Paiement sécurisé
                </label>
                <CardElement
                  id="card-element"
                  options={CARD_ELEMENT_OPTIONS}
                  onChange={handleChange}
                />
                <div className="card-errors" role="alert">
                  {error}
                </div>
              </div>
              <button className="payment-btn" type="submit">
                Payer {offer.price + " €"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
