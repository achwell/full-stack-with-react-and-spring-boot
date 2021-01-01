import React, {Component} from "react";
import moment from "moment";
import AuthenticationService from "../todo/AuthenticationService";
import TodoDataService from "../../api/todo/TodoDataService";

class ListTodosComponent extends Component {
    state = {
        todos: [],
        message: null
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
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

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    //console.log(response);
                    this.setState({todos: response.data})
                }
            )
            .catch( error => this.handleError(error) )
    }

    deleteTodoClicked = id => {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message: `Delete of todo ${id} Successful`})
                    this.refreshTodos()
                }
            )
            .catch( error => this.handleError(error) )

    }

    updateTodoClicked = id => {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked = () => {
        this.props.history.push(`/todos/-1`)
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>Is Completed?</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate.toString()).format('YYYY-MM-DD')}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateTodoClicked(todo.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.deleteTodoClicked(todo.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={() => this.addTodoClicked()}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent;
