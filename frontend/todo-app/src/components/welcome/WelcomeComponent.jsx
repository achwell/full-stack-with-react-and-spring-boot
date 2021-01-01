import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import HelloWorldService from '../../api/todo/HelloWorldService'

class WelcomeComponent extends Component {
    state = { welcomeMessage : '' }

    retrieveWelcomeMessage = () => {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
            .then( response => this.handleSuccessfulResponse(response) )
            .catch( error => this.handleError(error) )
    };

    handleSuccessfulResponse = response => {
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    };

    handleError = error => {
        let errorMessage = '';
        if(error.message) {
            errorMessage += error.message;
        }
        if(error.response && error.response.data) {
            errorMessage += error.response.data.message;
        }
        console.error({errorMessage})
        this.setState({welcomeMessage: errorMessage})
    }

    render() {
        return (
            <Fragment>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </Fragment>
        )
    }
}

export default WelcomeComponent;
