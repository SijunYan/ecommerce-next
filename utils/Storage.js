import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Context = createContext();

//Cookies.get("DarkMode") === "ON" ? true : false
const initialState = {
  darkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "DARK_MODE_ON":
      return state;
  }
};

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  // console.log(value);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
