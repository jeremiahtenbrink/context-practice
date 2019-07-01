import React, { useReducer, useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import firebase from "../firebase/firebaseConfig";
import { IUser } from "../types/IUser";
import { useUserData } from "../hooks/useUserData";
import { useAuth } from "../hooks/useAuth";
import { Button, Input, Form, Col } from "antd";

const Login = props => {
  const [values, handleChange, handleSubmit] = useForm(
    { email: "", password: "" },
    emailLoginFunction,
  );
  const [userForm, handleChangeUser, handleSubmitUser] = useForm(
    { firstName: "", lastName: "", address: "" },
    userFormSubmit,
  );

  const state = useAuth(props.history);
  const [loading, userData, exsists, addUser] = useUserData(
    state.user ? state.user.uid : null,
  );

  function emailLoginFunction() {
    if (props.history.location.pathname === "/login") {
      firebase.auth().signInWithEmailAndPassword(values.email, values.password);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
    }
  }

  function userFormSubmit() {
    const user = {
      id: state.user.uid,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      address: userForm.address,
    };
    addUser(user);
  }

  const providers = {
    GOOGLE_PROVIDER: new firebase.auth.GoogleAuthProvider(),
    FACEBOOK_PROVIDER: new firebase.auth.FacebookAuthProvider(),
  };

  function login(providerName: string) {
    const provider = providers[providerName];
    firebase.auth().signInWithPopup(provider);
  }

  if (state.user && userData) {
    props.history.push("/dashboard");
  }

  if (!state.user) {
    return (
      <Col md={12} offset={6}>
        <h1>Grit-N-Grind</h1>
        <Button onClick={() => firebase.auth().signOut()}>Log Out</Button>
        <Form onSubmit={handleSubmit}>
          <Input
            value={values.email}
            name={"email"}
            type={"email"}
            onChange={handleChange}
          />
          <Input
            value={values.password}
            name={"password"}
            type={"password"}
            onChange={handleChange}
          />
          <Button onClick={e => handleSubmit(e)}>
            {props.history.location.pathname === "/login" ? "Login" : "SignUp"}
          </Button>
        </Form>
        <Button onClick={() => login("GOOGLE_PROVIDER")}>Google</Button>
        <Button onClick={() => login("FACEBOOK_PROVIDER")}>Facebook</Button>
      </Col>
    );
  } else if (state.user && !exsists) {
    return (
      <div>
        <h1>Grit-N-Grind</h1>
        <Button onClick={() => firebase.auth().signOut()}>Log Out</Button>
        <Form onSubmit={handleSubmitUser}>
          <Input
            type='text'
            value={userForm.firstName}
            name={"firstName"}
            onChange={handleChangeUser}
          />
          <Input
            type='text'
            value={userForm.lastName}
            name={"lastName"}
            onChange={handleChangeUser}
          />
          <Input
            type='text'
            value={userForm.address}
            name={"address"}
            onChange={handleChangeUser}
          />
          <Button onClick={e => handleSubmit(e)}>Submit</Button>
        </Form>
      </div>
    );
  }
};

interface IFormValues {
  password: string;
  email: string;
}

export default Login;
