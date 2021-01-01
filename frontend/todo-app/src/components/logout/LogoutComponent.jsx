import React, {Component} from "react";
import AuthenticationService from "../todo/AuthenticationService";
import {Redirect} from "react-router-dom";

class LogoutComponent extends Component {

    render() {
        AuthenticationService.logout();
        return <Redirect to="/"/>
    }
}

export default LogoutComponent;
