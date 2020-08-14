import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import Login from "./containers/auth/Login";

import { store, persistor } from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Login />
      </PersistGate>
    </Provider>
  );
}

export default App;
