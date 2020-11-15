import React from 'react';
import './App.css';
import TodoInput from "./app/Containers/TodoInput/TodoInput";
import TodoItem from "./app/Components/TodoItem/TodoItem";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="row">
      <div className="col-1"/>
      <div className="col-10 cont">
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
      <div className="col-1"/>
    </div>
  );
}

export default App;
