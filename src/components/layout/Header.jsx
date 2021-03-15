import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import ProductContext from "../../context/products/productContext";
import AuthContext from "../../context/auth/authContext";

const Header = () => {
  const productContext = useContext(ProductContext);
  const { totalQuantity } = productContext;

  const authContext = useContext(AuthContext);
  const { user, getAuthenticatedUser, logOut } = authContext;

  const [quantity, setQuantity] = useState(totalQuantity);

  const signout = () => {
    logOut();
    window.location.reload(false);
  };

  useEffect(() => {
    setQuantity(totalQuantity);
    getAuthenticatedUser();
    //eslint-disable-next-line
  }, [totalQuantity]);

  return (
    <>
      <div className="nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a href="#!" className="navbar-brand">
              MENU
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto">
                <Link to="/" className="nav-item nav-link">
                  Home
                </Link>
                <Link to="/products" className="nav-item nav-link">
                  Products
                </Link>
                <Link to="/cart" className="nav-item nav-link">
                  Cart
                </Link>
                <Link to="/checkout" className="nav-item nav-link">
                  Checkout
                </Link>
              </div>
              <div className="navbar-nav ml-auto">
                <div className="nav-item dropdown">
                  <a
                    href="#!"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    User Account
                  </a>
                  <div className="dropdown-menu">
                    {user ? (
                      <a
                        href="#!"
                        className="dropdown-item"
                        onClick={() => signout()}
                      >
                        Log out
                      </a>
                    ) : (
                      <div>
                        <Link to="/login" className="dropdown-item">
                          Login
                        </Link>
                        <Link to="/register" className="dropdown-item">
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="logo">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>
            
            <div className="col-md-9">
              <div className="user">
                <Link to="/cart" className="btn cart">
                  <i className="fa fa-shopping-cart"></i>
                  <span>({quantity})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
