import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import AuthenticationService from "../todo/AuthenticationService";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedId = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedId);
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedId && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
                        {isUserLoggedId && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedId && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedId && <li><Link className="nav-link" to="/logout">Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);
