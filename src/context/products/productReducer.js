import {
  ADD_TO_CART,
  INCREMENT_QUANTITY_CART,
  DECREMENT_QUANTITY_CART,
  REMOVE_FROM_CART,
  SUB_TOTAL,
  GET_PRODUCTS,
  PAGINATED_PRODUCTS,
  FILTER_PRODUCTS_STATUS,
  CLEAN_CART,
  ADD_TO_CART_FROM_SERVER,
  GET_CATEGORIES
} from "../../types";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_STATUS:
    case PAGINATED_PRODUCTS:
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        pagination: {
          current_page: action.payload.current_page,
          first_page_url: action.payload.first_page_url,
          from: action.payload.from,
          last_page: action.payload.last_page,
          last_page_url: action.payload.last_page_url,
          next_page_url: action.payload.next_page_url,
          prev_page_url: action.payload.prev_page_url,
          links: action.payload.links,
        },
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case ADD_TO_CART_FROM_SERVER:
      return {
        ...state,
        cart: action.payload,
        totalQuantity: action.payload.reduce((acumulate, item) => { return acumulate + item.quantity;}, 0)
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload.product],
        totalQuantity: state.totalQuantity + action.payload.quantity,
      };
    case CLEAN_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
        totalQuantity: 0
      };
    case INCREMENT_QUANTITY_CART:
      const incrementIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const incrementCart = [...state.cart];
      incrementCart[incrementIndex] = {
        ...incrementCart[incrementIndex],
        quantity: incrementCart[incrementIndex].quantity + action.payload.qty,
      };
      return {
        ...state,
        cart: incrementCart,
        totalQuantity: state.totalQuantity + action.payload.qty,
      };
    case DECREMENT_QUANTITY_CART:
      const decrementIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      const decrementCart = [...state.cart];
      let decrementTotal = 0;
      if (decrementCart[decrementIndex].quantity === 1) {
        decrementTotal = 0;
      } else {
        decrementCart[decrementIndex] = {
          ...decrementCart[decrementIndex],
          quantity: decrementCart[decrementIndex].quantity - 1,
        };
        decrementTotal = 1;
      }
      return {
        ...state,
        cart: decrementCart,
        totalQuantity: state.totalQuantity - decrementTotal,
      };
    case REMOVE_FROM_CART:
      const newCart = state.cart.filter((item) => action.payload !== item.id);
      const removeIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      const removeCart = [...state.cart];
      let totalRemoved = removeCart[removeIndex].quantity;
      return {
        ...state,
        cart: newCart,
        totalQuantity: state.totalQuantity - totalRemoved,
      };
    case SUB_TOTAL:
      return {
        ...state,
        subtotal: state.cart.reduce((acumulate, item) => {
          return acumulate + item.price * item.quantity;
        }, 0),
      };
    default:
      break;
  }
};

export default ProductReducer;
