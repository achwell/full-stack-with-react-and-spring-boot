import React, {Component} from "react";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {

    state = {
        id: this.props.match.params.id,
        description: '',
        targetDate: moment(new Date()).format('YYYY-MM-DD')
    }

    componentDidMount() {
        if (this.state.id === "-1") {
            return;
        }
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => {
                const {description, targetDate} = response.data;
                this.setState({description, targetDate: moment(targetDate).format('YYYY-MM-DD')})
            }).catch(error => this.handleError(error));
    }

    handleError = error => {
        let errorMessage = '';
        if(error.message) {
            errorMessage += error.message;
        }
        if(error.response && error.response.data) {
            errorMessage += error.response.data.message;
        }
        console.error({errorMessage})
    }

    onSubmit = values => {
        const username = AuthenticationService.getLoggedInUserName()
        const id = this.state.id;
        const {description, targetDate} = values;
        const todo = {id, username, description, targetDate};
        if (this.state.id === "-1") {
            TodoDataService.createTodo(username, todo)
                .then(response => this.props.history.push("/todos/"))
                .catch(error => this.handleError(error))
        } else {
            TodoDataService.updateTodo(username, id, todo)
                .then(response => this.props.history.push("/todos/"))
                .catch(error => this.handleError(error))
        }
    }

    validate = values => {
        const errors = {};
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        console.log(values);
        return errors;
    }

    render() {
        const {description, targetDate} = this.state;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            props => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>

                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TodoComponent
