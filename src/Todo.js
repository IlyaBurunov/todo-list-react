import React from 'react';
import {  Link  } from "react-router-dom";

function Todo(props) {
    console.log(props);
    const todo = props.location.state;
    return(
        <div>
            <div>
                <p>Id: {todo.id}</p>
                <p>Text: {todo.text}</p>
                <p>Completed: {todo.completed + ''}</p>
            </div>
            <button>
                <Link to={{pathname: '/todos'}}>Back</Link>
            </button>
        </div>
    )
}

export default Todo;
