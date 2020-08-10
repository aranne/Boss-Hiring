import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./app/store";
import App from "./App";
import httpService from './web/interceptors';

httpService.setupInterceptors(store);           // use http interceptor

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
