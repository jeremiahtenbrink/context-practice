import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Login from "./views/Login";
import { withRouter } from "react-router-dom";
import { History } from "history";
import firebase from "./firebase/firebaseConfig";
import { useAuth, useSession, userContext } from "./hooks/useAuth";
import { User } from "firebase";
import Dashboard from "./views/Dasboard";

require("dotenv").config();

const App: React.FC<IProps> = props => {
  const state = useAuth(props.history);

  return (
    <>
      {" "}
      <Route exact path='/' render={props => <h1>root</h1>} />
      <Route path='/login' render={props => <Login {...props} />} />
      <Route path='/signup' render={props => <Login {...props} />} />
      <Route exact path='/home' render={props => <h1>home</h1>} />
      <Route path={"/dashboard"} render={props => <Dashboard {...props} />} />
    </>
  );
};

interface IProps {
  history?: History;
}

export default withRouter(App);
