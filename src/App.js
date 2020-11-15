import React from 'react';
import './App.css';
import TodoInput from "./app/Containers/TodoList/TodoInput";
import TodoItem from "./app/Components/TodoItem/TodoItem";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="row">
      <div className="col-4"/>
      <div className="col-4 cont">
        <div className="App">
          <header className="App-header">
            Your todo list
          </header>
          <section className="border shadow p-3 mb-5 bg-white rounded">
            <TodoInput />
            <TodoItem />
          </section>
        </div>
      </div>
      <div className="col-4"/>
    </div>
  );
}

export default App;
