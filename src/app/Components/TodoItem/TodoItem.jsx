import React, {useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import './TodoItem.css';
import {add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }  from '../../Containers/TodoList/todoSlice'; //, all, todo, completed
import {connect, useDispatch, useSelector} from 'react-redux';
import { compose } from '@reduxjs/toolkit';
/**
 * todo implement here component which will show todo item
 * Component should contain checkbox text and trash icon for remove item
 *
 * This component should receive the following params
 * text -  name of task
 * id - id of task
 * checked - checked state of the task
 * onCheck - callback which should be called if the checkbox state was changed
 * onRemove - callback which should be called if the trash icon was called
 *
 * NOTE: need to pass task id into callbacks as param
 */

const mapDispatch = { remove, markAsChecked, checkAll, clearCompleted, all, todo, completed } //, all, todo, completed
 
 function retrieve(condition = "") {
   let x = localStorage.getItem('keys') ? localStorage.getItem('keys') : 0
  //  if (!condition || condition === 'all') {
    let g
    if(!x) return []
    else g = JSON.parse(x)
    return g
  //  }
  //  else if (condition === 'todo'){

  //  }

 }

const TodoItem = ({ markAsChecked, remove, checkAll, clearCompleted, all, todo, completed }) => {   //, all, todo, completed
  const posts = useSelector((state) => retrieve())
  let check_counter = 0
  return (
    <div>
      <ul className="list-group list-group-flush">
      {posts.map((value, index) => {
        if (value.checked) check_counter++;
        return (
        <li className={"item list-group-item list" + (value.checked ? 'crossed' : 'no-cross')}key={index}>
          <input onClick={e => {markAsChecked(value.id)}} className="" checked={value.checked} type="checkbox" name="" id=""/>
          {value.text}
          <button value={value.id} onClick={e =>{
            e.preventDefault()
            remove(value.id)
          } }>Delete</button>
        </li>
        
        )
      })}
        
        {/* <li className="list-group-item">{x}</li> */}
        <li id="last" className="list-group-item">
          <span>Checked {check_counter}</span>
          <button onClick={() => all()}>All</button>
          <button onClick={() => checkAll()}>CheckAll</button>
          <button onClick={() => todo()}>ToDo</button> 
          <button onClick={() => completed()}>Completed</button>
          <button onClick={() => clearCompleted()}>Clear completed</button>
        </li>
      </ul>
    </div>

  )
}


const mapStateToProps = state => ({});  //todo setup this method for get info from the global state

const mapDispatchToProps = dispatch => ({});  //todo implement this function

export default connect(null, mapDispatch)(TodoItem)