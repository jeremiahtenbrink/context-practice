import React, { useReducer, useState } from "react";
import { useForm } from "../hooks/useForm";
import firebase from "../firebase/firebase";
import { useSession } from '../hooks/useAuth';
import { IUser } from "../types/IUser";

const Login = ( props ) => {
    const [ values, handleChange, handleSubmit ] = useForm(
        emailLoginFunction );
    const [ userForm, handleChangeUser, handleSubmitUser ] = useForm(
        userFormSubmit
    );
    const { user, userData, userExists, addUser } = useSession();
    debugger;
    
    function emailLoginFunction() {
        debugger;
        firebase.auth()
            .signInWithEmailAndPassword( values.email, values.password );
    }
    
    function userFormSubmit() {
        const newUser: IUser = {
            id: user.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            location: values.address,
        };
        addUser( newUser );
    }
    
    const providers = {
        GOOGLE_PROVIDER: new firebase.auth.GoogleAuthProvider(),
        FACEBOOK_PROVIDER: new firebase.auth.FacebookAuthProvider(),
    };
    
    function login( providerName: string ) {
        debugger;
        const provider = providers[ providerName ];
        firebase.auth().signInWithPopup( provider );
        
    }
    
    if ( !user ) {
        return ( <div>
            <h1>Grit-N-Grind</h1>
            <button onClick={ () => firebase.auth().signOut() }>Log Out</button>
            <form onSubmit={ handleSubmit }>
                <input value={ values.email } name={ "email" } type={ "email" }
                       onChange={ handleChange }/>
                <input value={ values.password } name={ "password" }
                       type={ "password" } onChange={ handleChange }/>
                <button type={ "submit" }>Email
                </button>
            </form>
            <button onClick={ () => login( 'GOOGLE_PROVIDER' ) }>Google
            </button>
            <button onClick={ () => login( 'FACEBOOK_PROVIDER' ) }>Facebook
            </button>
        </div> );
    } else if ( user && !userExists ) {
        return (
            <div>
                <h1>Add User</h1>
                <form onSubmit={ handleSubmitUser }>
                    <input value={ userForm.firstName } name={ "firstName" }
                           onChange={ handleChangeUser }/>
                    <input value={ userForm.lastName } name={ "lastName" }
                           onChange={ handleChangeUser }/>
                    <input value={ userForm.address } name={ "address" }
                           onChange={ handleChangeUser }/>
                </form>
            </div>
        )
    } else {
        return <div>Other</div>
    }
};

interface IFormValues {
    password: string;
    email: string;
}

export default Login;