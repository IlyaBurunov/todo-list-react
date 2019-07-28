import React, { useState } from 'react';
import './App.css';

function ListItem(props) {

  return (
      <div className="view">
        <input onClick={props.onListItemInputClick(props.id)} className="toggle" type="checkbox"/>
        <label>{props.text}</label>
        <button className="destroy"/>
      </div>
  )
}

function List(props) {

    const list = props.todoList.map(item => {
        return(
            <li key={item.id}>
                <ListItem onListItemInputClick={props.onListItemCheckboxChanged} id={item.id} text={item.text}/>
            </li>
        )
    });
  return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox"/>
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
        <List onListItemCheckboxChanged={props.onListItemCheckboxChanged} todoList={props.todoList}/>
        <TodoListFooter />
      </div>
  )
}

function UserInput(props) {

    const handleInputChange = (event) => {
        props.onUserInputChange(event.target.value)
    };

    const handleInputKeyPress = (event) => {
        if(event.charCode === 13) {
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
               autoFocus/>
      </header>
  )
}

function App() {

    const [todoList, setTodoList] = useState([]);
    const [userText, setUserText] = useState('');

    const handleUserInputKeyEnterPress = () => {
        setTodoList([{
            id: todoList.length + 1,
            text: userText
        }].concat(todoList));
        setUserText('');
    };

    const handleUserInputChange = (text) => {
        setUserText(text);
    };


    const handleListItemCheckboxChange = (id) => {
        console.log(id);
    };
  return (
      <section className="todoapp">
        <UserInput userText={userText}
                   onUserInputChange={handleUserInputChange}
                   onUserInputKeyEnterPress={handleUserInputKeyEnterPress}/>
        <TodoList todoList={todoList} onListItemCheckboxChanged={handleListItemCheckboxChange}/>
      </section>
  );
}

export default App;
