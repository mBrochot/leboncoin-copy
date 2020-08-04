import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);

const stripePromise = loadStripe(
  "pk_test_51HCRiMCNmlttfPiZlC817DDOQxzrXfN1G6hmyBDOcHi6QnnVSMoxuS6T2ADE0EXzBV4ykyPQBz5IT40uLcyEvEew00tWUjcSZK"
);

function App() {
  const [hide, setHide] = useState(false);
  // const [reveal, setReveal] = useState(true);
  const token = Cookies.get("token");
  const [user, setUser] = useState(token || null);

  return (
    <div className={!hide ? "App" : "AppFixed"}>
      <Router>
        <Header hide={hide} setHide={setHide} user={user} setUser={setUser} />
        <Switch>
          <Route path="/user/sign_up">
            <SignUp setUser={setUser} />
          </Route>
          <Route path="/offer/publish">
            <Publish />
          </Route>
          <Route path="/offer/:id">
            <Offer
              hide={hide}
              setHide={setHide}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/pay">
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Offers />
          </Route>
        </Switch>
        {hide && <LogIn hide={hide} setHide={setHide} setUser={setUser} />}
      </Router>
    </div>
  );
}

export default App;
