import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./output.css";
import { store } from "./store";
import { ChainContextProvider } from "./store/ChainContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChainContextProvider>
        <App />
      </ChainContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
