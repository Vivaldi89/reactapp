import React, {useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import './TodoItem.css';
import {add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }  from '../../Containers/TodoList/todoSlice'; //, all, todo, completed
import {connect, useDispatch, useSelector} from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { Button, ButtonGroup, Input, Label } from 'reactstrap';
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


const TodoItem = ({ markAsChecked, remove, checkAll, clearCompleted, all, todo, completed }) => {   //, all, todo, completed
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  }
  const posts = useSelector((state) => retrieve())
  let length = posts.length
  let check_counter = 0
  let mode = localStorage.getItem('mode')
  let isBacked = localStorage.getItem('backup')
  if (length === 0 && !isBacked && !localStorage.getItem('mode')) return null
  return (
    <div>
      <ul className="list-group list-group-flush">
      {posts.map((value, index) => {
        if (!value.checked) check_counter++;
        
        return (
        <li className={"item list-group-item list " + (value.checked ? 'crossed' : 'no-cross')}key={index}>
          
          <div className='chec'><input type="checkbox" onClick={e => {markAsChecked(value.id)}} className="checkb icon-check-empty" checked={value.checked} type="checkbox" name="" id=""/></div>
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
          {/* <span>Tasks left {check_counter}</span> */}
          <div id="btn-gr" className="btn-group btn-group-toggle data-toggle" data-toggle="buttons">
            
            <Label className={"btn btn-sm "+(!isBacked || mode === 0 ? "btn-success" : "btn-secondary")}><Input type="radio" clicked name="options" id="option1" autocomplete="off" className={"center_btn "+ (localStorage.getItem('backup') ? "btn-color-clicked": "")} onClick={() => all()}/>All</Label>
            <Label className={"btn btn-sm " +(mode == 1 ? "btn-success" : "btn-secondary")}><Input type="radio" name="options" id="option1" autocomplete="off" className="center_btn" onClick={() => todo()}/>ToDo</Label>
            <Label className={"btn btn-sm "+(mode == 2 ? "btn-success" : "btn-secondary")}><Input type="radio" name="options" id="option1" autocomplete="off" className="center_btn"onClick={() => completed()}/>Completed</Label>
          </div>
          {/* <ButtonGroup id="btn-gr">
            <label htmlFor=""><input type="radio" checked={true}></input></label>
            <Button outline className="radios" size="sm" color="secondary" active={rSelected === 1} selected={true} onClick={() => {all();setRSelected(1);}}>All</Button>
            <Button outline className="radios" size="sm" color="secondary" active={rSelected === 2} onClick={() => {todo();setRSelected(2);}}>ToDo</Button>
            <Button outline className="radios" size="sm" color="secondary" active={rSelected === 3} onClick={() => {completed();setRSelected(3);}}>Completed</Button>
          </ButtonGroup> */}
          <i type='button' id="clear" onClick={() => clearCompleted()}>{length > check_counter ? 'Clear completed': null}</i>
          
        </li>
      </ul>
    </div>
    
  )
  
}


const mapStateToProps = state => ({});  //todo setup this method for get info from the global state

const mapDispatchToProps = dispatch => ({});  //todo implement this function

export default connect(null, mapDispatch)(TodoItem)
