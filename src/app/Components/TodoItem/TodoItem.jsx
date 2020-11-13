import React, {useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import './TodoItem.css';
import {add, remove, markAsChecked, checkAll }  from '../../Containers/TodoList/todoSlice';
import {connect, useDispatch, useSelector} from 'react-redux';
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

const mapDispatch = {remove, markAsChecked, checkAll}
 
 function retrieve() {
    let x = localStorage.getItem('keys') ? localStorage.getItem('keys') : 0
    let g
    if(!x) return []
    else g = JSON.parse(x)
    return g
 }

const TodoItem = ({ markAsChecked, remove, checkAll }) => {
  const posts = useSelector((state) => retrieve())
  return (
    <div>
      <ul className="list-group list-group-flush">
      {posts.map((value, index) => {
        
        return (
        <li className="item list-group-item" key={index}>
          <input onClick={e => {markAsChecked(value.id)}} checked={value.checked} type="checkbox" name="" id=""/>
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
          <button onClick={() => checkAll()}>CheckAll</button>
          <button>ToDo</button>
          <button>Completed</button>
          <button>Clear completed</button>
        </li>
      </ul>
    </div>

  )
}


const mapStateToProps = state => ({});  //todo setup this method for get info from the global state

const mapDispatchToProps = dispatch => ({});  //todo implement this function

export default connect(null, mapDispatch)(TodoItem)