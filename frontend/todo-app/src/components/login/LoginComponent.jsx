import React, {Component, Fragment} from "react";
import AuthenticationService from "../todo/AuthenticationService";

class LoginComponent extends Component {

    state = {
        username: 'in28minutes',
        password: '',
        hasLoginFailed: false,
        showSuccessMessage: false
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    loginClicked = () => {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(response => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, response.data.token)
                this.setState({showSuccessMessage: true})
                this.setState({hasLoginFailed: false})
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })
    }

    render() {
        return (
            <Fragment>
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password}
                                 onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </Fragment>
        )
    }
}

export default LoginComponent;