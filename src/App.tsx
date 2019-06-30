import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import Login from "./views/Login";
import { useAuth, userContext } from "./hooks/useAuth";
import { withRouter } from 'react-router-dom';
import { History } from 'history';

require( 'dotenv' ).config();

const App: React.FC<IProps> = ( props ) => {
    const [ initalizing, user, userData, userExists, addUser ] = useAuth(
        props.history );
    return (
        <>
            <userContext.Provider
                value={ { user, userData, userExists, addUser } }>
                <Route path={ "/" } component={ Login }/>
            </userContext.Provider>
        </>
    );
};

interface IProps {
    history?: History
}

export default withRouter( App );
