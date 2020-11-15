import React, {useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }  from '../../Containers/TodoList/todoSlice'; //, all, todo, completed
import { connect, useSelector} from 'react-redux';
import { Input, Label } from 'reactstrap';
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
    let g
    if(!x) return []
    else g = JSON.parse(x)
    return g
 }

const TodoItem = ({ markAsChecked, remove, checkAll, clearCompleted, all, todo, completed }) => { 
  let mode = localStorage.getItem('mode')
  const posts = useSelector((state) => retrieve())
  let length = posts.length
  let check_counter = 0
  
  let isBacked = localStorage.getItem('backup')
  if (length === 0 && !mode) return null
  return (
    <div>
      <ul className="list-group list-group-flush">
      {posts.map((value, index) => {
        if (!value.checked) check_counter++;
        
        return (
        <li className={"item list-group-item list " + (value.checked ? 'crossed' : 'no-cross')}key={index}>
          
          <div className='chec'><input type="checkbox" onClick={e => {markAsChecked(value.id)}} className="checkb icon-check-empty" checked={value.checked} type="checkbox"/></div>
          <div className='text'>{value.text}</div>
          <div className='trash'><FontAwesomeIcon type="button" id="trash" icon={faTrashAlt} value={value.id} onClick={e =>{
            e.preventDefault()
            remove(value.id)
          } }>Delete</FontAwesomeIcon></div>
        </li>
        )
      })} 
        <li id="last" className="list-group-item">
          <i type='button' id="task_left" onClick={() => checkAll()}>Tasks left {check_counter}</i>
          <div id="btn-gr" className="btn-group btn-group-toggle data-toggle" data-toggle="buttons">
            <Label className={"btn btn-sm "+(!isBacked || mode === 0 ? "btn-success" : "btn-secondary")}>
              <Input type="radio" clicked name="options" id="option1" className={"center_btn "+ (localStorage.getItem('backup') ? "btn-color-clicked": "")} onClick={() => all()}/>All
            </Label>
            <Label className={"btn btn-sm " +(mode == 1 ? "btn-success" : "btn-secondary")}>
              <Input type="radio" name="options" id="option1" autocomplete="off" className="center_btn" onClick={() => todo()}/>ToDo
            </Label>
            <Label className={"btn btn-sm "+(mode == 2 ? "btn-success" : "btn-secondary")}>
              <Input type="radio" name="options" id="option1" autocomplete="off" className="center_btn" onClick={() => completed()}/>Completed
            </Label>
          </div>
          <i type='button' id="clear" onClick={() => clearCompleted()}>{length > check_counter ? 'Clear completed': null}</i>       
        </li>
      </ul>
    </div>
  )
}

export default connect(null, mapDispatch)(TodoItem)
