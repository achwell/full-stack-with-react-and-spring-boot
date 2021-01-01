import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginComponent from "../login/LoginComponent";
import WelcomeComponent from "../welcome/WelcomeComponent";
import ErrorComponent from "../error/ErrorComponent";
import ListTodosComponent from "../listtodos/ListTodosComponent";
import HeaderComponent from "../header/HeaderComponent";
import FooterComponent from "../footer/FooterComponent";
import LogoutComponent from "../logout/LogoutComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                        <AuthenticatedRoute exact path="/todos" component={ListTodosComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

export default TodoApp;