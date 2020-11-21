import React from 'react';
import './App.css';
import TodoInput from "./app/Containers/TodoInput/TodoInput";
import TodoItem from "./app/Components/TodoItem/TodoItem";
import Tasks from "./app/Components/TodoItem/Items";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Checkbox.css';
import axios from 'axios';
import store from './app/store'
import getData from './app/Containers/TodoInput/todoSlice'



function App() {
  return (
    <div className="row">
      <div className="col-12 cont">
        <div className="App mx-auto">
          <header className="App-header">
            Your todo list
          </header>
          <section  className="border rounded-0 shadow-lg mb-5 bg-white">
            <TodoInput />
            <Tasks />
            {/* <TodoItem  className="todoitem" /> */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
