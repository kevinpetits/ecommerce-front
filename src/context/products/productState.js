import React, { useContext, useEffect, useReducer } from "react";
import {
  ADD_TO_CART,
  INCREMENT_QUANTITY_CART,
  DECREMENT_QUANTITY_CART,
  REMOVE_FROM_CART,
  SUB_TOTAL,
  GET_PRODUCTS,
  GET_CATEGORIES,
  PAGINATED_PRODUCTS,
  FILTER_PRODUCTS_STATUS,
  CLEAN_CART,
  ADD_TO_CART_FROM_SERVER,
} from "../../types";
import ProductContext from "./productContext";
import ProductReducer from "./productReducer";
import swal from "sweetalert";
import clientAxios from "../../config/axios";
import axios from "axios";
import AuthContext from "../auth/authContext";

const ProductState = (props) => {
  const storage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const Quantity =
    storage.length !== 0
      ? storage.reduce((acumulate, item) => {
          return acumulate + item.quantity;
        }, 0)
      : 0;

  const initialState = {
    products: [],
    categories: [],
    selectedProduct: null,
    cart: storage,
    totalQuantity: Quantity,
    subtotal: 0,
    pagination: {},
  };
  // Dispatch para ejecutar las acciones del reducer
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  // Serie de funciones para el CRUD
  // Obtiene las tareas por proyecto seleccionado

  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const getProducts = async () => {
    try {
      const response = await clientAxios.get("/products");
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const response = await clientAxios.get("/categories");
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {}
  };

  const getPaginatedProducts = async (url) => {
    try {
      const response = await axios.get(url);
      dispatch({
        type: PAGINATED_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {}
  };

  const getProduct = async (id) => {
    try {
      const response = await clientAxios.get(`/product/${id}`);
      return response;
    } catch (error) {}
  };

  const filterProductByStatus = async (status) => {
    try {
      const response = await clientAxios.get(
        `/products/filter?status=${status}`
      );
      dispatch({
        type: FILTER_PRODUCTS_STATUS,
        payload: response.data,
      });
    } catch (error) {}
  };

  const filterProductByCategory = async (categoryId) => {
    try {
      const response = await clientAxios.get(
        `/products/category?category=${categoryId}`
      );
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {}
  };

  const getCarrito = async () => {
    if (token) {
      try {
        const response = await clientAxios.get("/cart");
        console.log(response.data);
        if (response.data.length === 0 && state.cart.length !== 0) {
          await addToCartFromLocalStorage();
        } else {
          let arr = [];
          for (var i in response.data) {
            const {
              id,
              name,
              price,
              quantity,
              associatedModel,
            } = response.data[i];
            arr.push({ id, name, price, quantity, associatedModel });
          }
          if (arr.length > 1) {
            dispatch({
              type: ADD_TO_CART_FROM_SERVER,
              payload: arr,
            });
          } else if (arr.length === 1) {
            const params = {
              product: arr[0],
              quantity: arr[0].quantity,
            };
            dispatch({
              type: ADD_TO_CART,
              payload: params,
            });
          }
        }
      } catch (error) {}
    }
  };

  const addToCartFromLocalStorage = async () => {
    await state.cart.forEach((element) => {
      state.cart.forEach((element) => {
        clientAxios.post("/add_to_cart", { product_id: element.id });
      });
    });

    dispatch({
      type: CLEAN_CART,
    });
  };

  const addToCart = async (product, quantity = 1) => {
    if (token) {
      try {
        const response = await clientAxios.post("/add_to_cart", {
          product_id: product.id,
        });
        let arr = [];
        for (var i in response.data) {
          const { id, name, price, quantity, associatedModel } = response.data[
            i
          ];
          arr.push({ id, name, price, quantity, associatedModel });
        }
        dispatch({
          type: ADD_TO_CART_FROM_SERVER,
          payload: arr,
        });
      } catch (error) {}
    } else {
      const existsInCart = state.cart.find((item) => item.id === product.id);
      if (existsInCart !== undefined) {
        incrementQty(product.id, quantity);
      } else {
        const params = {
          product: {
            id: product.id,
            name: product.product_name,
            price: product.price,
            quantity: quantity,
            associatedModel: {
              id: product.id,
              product_name: product.product_name,
              src: product.src,
              description: product.description,
              price: product.price,
            },
          },
          quantity,
        };
        dispatch({
          type: ADD_TO_CART,
          payload: params,
        });
      }
    }
  };

  const reduceQty = async (id) => {
    if (token) {
      try {
        const response = await clientAxios.post("/decrease", {
          product_id: id,
        });
        let arr = [];
        for (var i in response.data) {
          const { id, name, price, quantity, associatedModel } = response.data[
            i
          ];
          arr.push({ id, name, price, quantity, associatedModel });
        }
        dispatch({
          type: ADD_TO_CART_FROM_SERVER,
          payload: arr,
        });
      } catch (error) {}
    } else {
      dispatch({
        type: DECREMENT_QUANTITY_CART,
        payload: id,
      });
    }
  };
  const incrementQty = (id, qty = 1) => {
    const params = {
      id,
      qty,
    };
    dispatch({
      type: INCREMENT_QUANTITY_CART,
      payload: params,
    });
  };

  const removeFromCart = (id) => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will have to add this product to the cart again!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        if (token) {
          try {
            const response = await clientAxios.post("/delete_from_cart", {
              product_id: id,
            });
            let arr = [];
            for (var i in response.data) {
              const {
                id,
                name,
                price,
                quantity,
                associatedModel,
              } = response.data[i];
              arr.push({ id, name, price, quantity, associatedModel });
            }
            dispatch({
              type: ADD_TO_CART_FROM_SERVER,
              payload: arr,
            });
          } catch (error) {}
        } else {
          dispatch({
            type: REMOVE_FROM_CART,
            payload: id,
          });
          swal("The product has been deleted succesfully", {
            icon: "success",
          });
        }
      } else {
      }
    });
  };

  const cleanCart = async () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will have to add all the products to the cart again!",
      icon: "warning",
      buttons: ["Cancel", "Delete All"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        if (token) {
          try {
            await clientAxios.delete("/clear");
          } catch (error) {}
        }
        dispatch({
          type: CLEAN_CART,
        });
        swal("The cart has been cleared succesfully", {
          icon: "success",
        });
      } else {
      }
    });
  };

  const getSubTotal = () => {
    dispatch({
      type: SUB_TOTAL,
    });
  };

  const updateStorageCart = () => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  };

  useEffect(() => {
    if (state.cart.length !== 0) {
      updateStorageCart();
    }
    //eslint-disable-next-line
  }, [state.cart]);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        selectedProduct: state.selectedProduct,
        cart: state.cart,
        totalQuantity: state.totalQuantity,
        subtotal: state.subtotal,
        pagination: state.pagination,
        addToCart,
        reduceQty,
        incrementQty,
        removeFromCart,
        getSubTotal,
        getProducts,
        getCategories,
        getProduct,
        getPaginatedProducts,
        filterProductByStatus,
        getCarrito,
        cleanCart,
        filterProductByCategory,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
