import React, {Component} from "react";

import TodoApp from "./components/todo/TodoApp";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {

    state = {counter: 0};

    render = () => {
        return (
            <div className="App">
                <TodoApp/>
            </div>
        );
    };
}

export default App;
