import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./store/index";

import Header from "./components/header";
import Home from "./containers/home";
import ListView from "./containers/results/listView";

// import Login from "./containers/auth/Login";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={ListView} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
