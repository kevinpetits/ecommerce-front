import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import Cart from "../content/Cart";
import Checkout from "../content/Checkout";
import ProductDetail from "../content/ProductDetail";
import Products from "../content/Products";

const Content = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Signin} />
        <Route path="/register" component={Signup} />
        <Route path="/" component={Products} exact />
        <Route path="/products" component={Products} exact />
        <Route path="/product/:id" component={ProductDetail} exact />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </>
  );
};

export default Content;
