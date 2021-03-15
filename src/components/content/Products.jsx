import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import { Link, useHistory } from "react-router-dom";
import ProductContext from "../../context/products/productContext";
import AuthContext from "../../context/auth/authContext";

const Products = () => {
  const productContext = useContext(ProductContext);
  const {
    products,
    addToCart,
    getProducts,
    getCategories,
    pagination,
    getPaginatedProducts,
    filterProductByStatus,
    getCarrito,
    categories,
  } = productContext;

  const authContext = useContext(AuthContext);
  const {token} = authContext;
  const history = useHistory();
  const [filtered, setFiltered] = useState("Product filter by");

  const redirectToCart = (product) => {
    addToCart(product);
    history.push("/cart");
  };

  const filter = (status) => {
    setFiltered(status);
    filterProductByStatus(status);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getCarrito();
   
    //eslint-disable-next-line
  }, [token]);

  return (
    <>
      <div className="product-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="product-view-top">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="product-short">
                          <div className="dropdown">
                            <div
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              {filtered}
                            </div>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button
                                onClick={() => filter("New")}
                                className="dropdown-item"
                              >
                                New
                              </button>
                              <button
                                onClick={() => filter("Used")}
                                className="dropdown-item"
                              >
                                Used
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {products.map((product) => (
                  <div className="col-md-4" key={product.id}>
                    <div className="product-item">
                      <div className="product-title">
                        <Link to={`/product/${product.id}`}>
                          {product.product_name} ({product.status})
                        </Link>
                      </div>
                      <div className="product-image">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/${product.src}`}
                            alt={product.product_name}
                          />
                        </Link>
                        <div className="product-action">
                          <button onClick={() => addToCart(product)}>
                            <i className="fa fa-cart-plus"></i>
                          </button>
                          <Link to={`/product/${product.id}`}>
                            <i className="fa fa-search"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="product-price">
                        <h3>
                          <span>$</span>
                          {product.price}
                        </h3>
                        <button
                          className="btn"
                          onClick={() => redirectToCart(product)}
                        >
                          <i className="fa fa-shopping-cart"></i>Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <button
                        className="page-link"
                        tabIndex="-1"
                        onClick={() =>
                          getPaginatedProducts(pagination.prev_page_url)
                        }
                      >
                        Previous
                      </button>
                    </li>
                    {pagination.links
                      ? pagination.links.slice(1, -1).map((item) => (
                          <li
                            className={`page-item ${
                              item.active === true ? "active" : ""
                            }`}
                            key={item.label}
                          >
                            <button
                              className="page-link"
                              onClick={() => getPaginatedProducts(item.url)}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))
                      : ""}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() =>
                          getPaginatedProducts(pagination.next_page_url)
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <Sidebar categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
