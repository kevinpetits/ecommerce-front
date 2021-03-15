import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/products/productContext";

const Sidebar = (props) => {
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
    filterProductByCategory
  } = productContext;

  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    setCategoriesList(props.categories);
  }, [props.categories]);

  return (
    <div className="col-lg-4 sidebar">
      <div className="sidebar-widget category">
        <h2 className="title">Category</h2>
        <nav className="navbar bg-light">
          <ul className="navbar-nav">
            {categoriesList.map((category) => (
              <li className="nav-item" key={category.id}>
                <a className="nav-link" href="#!" onClick={() => filterProductByCategory(category.id)}>
                  <i className="fa fa-tshirt"></i>
                  {category.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
