import React from "react";
import ReactDOM from "react-dom";

import combineReducers from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";

//

//using the redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware())
);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
