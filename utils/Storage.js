import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import cart from "../pages/cart";

export const Storage = createContext();

//Cookies.get("DarkMode") === "ON" ? true : false
const initialState = {
  darkMode: false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    totalAmount: 0,
  },
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      // console.log(newItem.name);
      // check if there is the item in the cart already, to calculate the quantity in cart
      const existItem = state.cart.cartItems.find((item) => {
        return item.name === newItem.name;
      });
      const quantity = existItem ? existItem.quantity + 1 : 1;
      // console.log(`instock: ${newItem.countInStock}; inCart: ${quantity}`);
      //check stocks, if stocks<quantity, stop dispatch. oterwise, dispatch with the product info and quantity
      if (newItem.countInStock < quantity) {
        window.alert("Sorry. Product is out of stock");
      }
      // update the affected item or directly add the new item
      const updatedItem = existItem
        ? { ...existItem, quantity }
        : { ...newItem, quantity };
      // console.log(updatedItem);
      // update the cartItems, then the cart, finally the entire state
      const updatedCartItems = existItem
        ? state.cart.cartItems.map((item) => {
            return item.name === existItem.name ? updatedItem : item;
          })
        : [...state.cart.cartItems, updatedItem];
      Cookies.set("cartItems", JSON.stringify(updatedCartItems));
      // const updatedCart = { ...state.cart, cartItems: updatedCartItems };
      // console.log("update the state");
      // console.log({ ...state, cart: updatedCart });
      // return { ...state, cart: updatedCart };
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
    }
    case "CART_UPDATE_ITEM": {
      // updatedItem include quantity already.
      const updatedItem = action.payload;
      // update the cartItems, then the cart, finally the entire state
      const updatedCartItems = state.cart.cartItems.map((item) => {
        return item.name === updatedItem.name ? updatedItem : item;
      });
      Cookies.set("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
    }
    case "CART_DELETE_ITEM": {
      const deleteItem = action.payload;
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item.name !== deleteItem.name
      );
      Cookies.set("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
    }
    case "USER_LOGIN": {
      const userInfo = action.payload;
      Cookies.set("userInfo", JSON.stringify(userInfo));
      return { ...state, userInfo };
    }
    case "USER_LOGOUT": {
      Cookies.remove("userInfo");
      Cookies.remove("cartItems");
      return { ...state, cart: { ...cart, cartItems: [] }, userInfo: null };
    }
  }
};

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(value);
  return <Storage.Provider value={value}>{props.children}</Storage.Provider>;
};
