import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListItemContext = React.createContext({
    list: [],
    setCompleted: () => { }
});

function ListItem(props) {

    const routerData = {
        pathname: `/todo/${props.id}`,
        state: props
    };

    return (
        <ListItemContext.Consumer>
            {({ list, setCompleted }) => (
                <div className="view">
                    <input onChange={() => setCompleted(props.id, props.completed)}
                        className="toggle"
                        type="checkbox"
                        checked={props.completed} />
                    <label>
                        <Link to={routerData}>
                            {props.text}
                        </Link>
                    </label>
                    <button className="destroy" />
                </div>
            )}
        </ListItemContext.Consumer>
    )
}

function List(props) {

    const todoIsCompleted = (id) => {
        return !!props.completedTodo.find(todo => todo === id);
    };

    const list = props.todoList.map(item => {
        if (todoIsCompleted(item.id)) {
            return (
                <li className="completed" key={item.id}>
                    <ListItem id={item.id} text={item.text} completed={true} />
                </li>
            )
        } else {
            return (
                <li key={item.id}>
                    <ListItem id={item.id} text={item.text} completed={false} />
                </li>
            )
        }
    });
    return (
        <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {list}
            </ul>
        </section>
    )
}

function TodoListFooter() {
    return (
        <footer className="footer">
            <span className="todo-count"><strong>0</strong> item left</span>
            <ul className="filters">
                <li>
                    <a className="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

function TodoList(props) {
    return (
        <div>
            <List completedTodo={props.completedTodo} todoList={props.todoList} />
            <TodoListFooter />
        </div>
    )
}

function UserInput(props) {

    const handleInputChange = (event) => {
        props.onUserInputChange(event.target.value)
    };

    const handleInputKeyPress = (event) => {
        if (event.charCode === 13) {
            props.onUserInputKeyEnterPress();
        }
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <input value={props.userText}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus />
        </header>
    )
}

function Todos(props) {
    const localStorageKey = 'todosData';
    const [todoList, setTodoList] = useState([]);
    const [userText, setUserText] = useState('');
    const [completedTodo, setCompletedTodo] = useState([]);

    const handleUserInputKeyEnterPress = () => {
        if (userText) {
            const newTodoList = [{
                id: todoList.length + 1,
                text: userText,
            }].concat(todoList);
            setTodoList(newTodoList);
            setUserText('');
            saveTodosData(newTodoList, null);
            setTodoTextInUrl('');
        }
    };

    const setTodoTextInUrl = (text) => {
        const searchParams = new URLSearchParams();
        searchParams.set('text', text);
        props.history.push(`?${searchParams.toString()}`)
    };

    const handleUserInputChange = (text) => {
        setUserText(text);
        setTodoTextInUrl(text);
    };

    useEffect(() => {
        const textFromUrl = new URLSearchParams(window.location.search).get('text');
        if (textFromUrl !== null) {
            setUserText(textFromUrl);
        }
    }, []);

    const handleListItemCheckboxChange = (id, status) => {
        const newCompletedTodo = !status ? completedTodo.concat([id])
            : completedTodo.filter(todo => todo !== id);
        setCompletedTodo(newCompletedTodo);
        saveTodosData(null, newCompletedTodo);
    };

    const saveTodosData = (newTodoList, newCompletedTodo) => {
        const list = newTodoList ? newTodoList : todoList;
        const completedList = newCompletedTodo ? newCompletedTodo : completedTodo;
        localStorage.setItem(localStorageKey, JSON.stringify({
            todoList: list,
            completedTodo: completedList
        }));
    };

    useEffect(() => {
        const savedValueString = localStorage.getItem(localStorageKey);
        const storageData = savedValueString && JSON.parse(savedValueString);
        if (storageData) {
            setTodoList(storageData.todoList);
            setCompletedTodo(storageData.completedTodo)
        }
    }, []);

    return (
        <ListItemContext.Provider value={
            {
                list: todoList,
                setCompleted: handleListItemCheckboxChange
            }
        }>
            <section className="todoapp">
                <UserInput userText={userText}
                    onUserInputChange={handleUserInputChange}
                    onUserInputKeyEnterPress={handleUserInputKeyEnterPress} />
                <TodoList todoList={todoList} completedTodo={completedTodo} />
            </section>
        </ListItemContext.Provider>
    );
}

export default Todos;
