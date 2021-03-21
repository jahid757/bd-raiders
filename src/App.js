import React, { createContext, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Destination from './components/Destination/Destination';
import Login from './components/Login/Login'
import PrivetRoute from "./components/PrivetRoute/PrivetRoute";

export const UserContext = createContext()


function App() {

  const [loggedInUser,setLoggedInUser] = useState({})

  return (
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
          <Router>
            <Header></Header>
            <Switch>

                <Route path="/home">
                  <Home />
                </Route>

                <PrivetRoute path="/destination/:id">
                  <Destination></Destination>
                </PrivetRoute>

                <Route path="/login">
                  <Login></Login>
                </Route>
                <Route exact path="/">
                  <Home></Home>
                </Route>
            </Switch>
          </Router>
      </UserContext.Provider>
  );
}

export default App;
