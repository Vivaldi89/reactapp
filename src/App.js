import React from 'react';
import './App.css';
import TodoList from "./app/Containers/TodoList/TodoList";
import TodoItem from "./app/Components/TodoItem/TodoItem";
import 'bootstrap/dist/css/bootstrap.min.css';
const writeFileP = require("write-file-p");
var fs = require('browserify-fs');



function App() {
  return (
    <div className="row">
      <div className="col-4"/>
      <div className="col-4 ">
        <div className="App">
          <header className="App-header">
            {/* <h5>Your todo list</h5> */}
            Your todo list
          </header>
          <section className="border shadow p-3 mb-5 bg-white rounded">
            <TodoList />
            <TodoItem />
          </section>
        </div>
      </div>
      <div className="col-4"/>
    </div>
    
  );
}

export default App;
