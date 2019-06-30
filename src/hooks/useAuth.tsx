import React, { useContext, useEffect } from "react";
import firebase, { store } from "../firebase/firebase";
import { History } from "history";
import { User } from 'firebase';
import { IUser } from "../types/IUser";

const initialContext: IUserContext = {
    user: null,
    userData: null,
    userExists: false,
    addUser: null,
};

export const userContext = React.createContext( initialContext);

interface IUserContext {
    user: null | User;
    userData: null | IUser;
    userExists: boolean;
    addUser: null | addUser;
}

type addUser = (user: IUser)=> void;


export const useSession = () => {
    return useContext( userContext );
};

export const useAuth = ( history: History ): [ boolean, User, IUser | null, boolean, ( user: IUser ) => void ] => {
    const [ state, setState ] = React.useState( () => {
        const user: User | null = firebase.auth().currentUser;
        return {
            initializing: !user, user, userData: null, userExists: false,
            addUser
        };
    } );
    
    // add user to db and then set user data to data.
    function addUser( user: IUser ): void {
        store.collection( "users" ).doc( user.id ).set( user );
        setState( { ...state, userData: user } );
    }
    
    // set the new state of the user on change of auth.
    function onChange( authUser: User | null = state.user ) {
        debugger;
        if ( !authUser ) {
            history.push( '/login' );
        } else {
            debugger;
            store.collection( 'users' ).doc( authUser.uid ).get()
                .then( res => {
                    if ( res.exists ) {
                        const userData = res.data();
                        userData.id = res.id;
                        setState( {
                            ...state, user: authUser || state.user, userData,
                            userExists: true, initializing: false
                        } )
                    } else {
                        setState( {
                            ...state, user: authUser || state.user,
                            userExists: false, initializing: false
                        } );
                    }
                } );
            
            
        }
    }
    
    // Run once on component did mount.
    useEffect( () => {
        // listen for auth state changes and call on change function when
        // auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged( onChange );
        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, [] );
    
    return [ state.initializing, state.user, state.userData, state.userExists,
        addUser ];
};