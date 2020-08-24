import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./store/index";

import Header from "components/header";
import Home from "containers/home";
import ListView from "containers/results/listView";
import GraphView from "containers/results/graphView";
import Dashboard from "containers/dashboard";
import Register from"containers/register";

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
            <Route exact path="/" component={ListView} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/result/graph" component={GraphView} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
