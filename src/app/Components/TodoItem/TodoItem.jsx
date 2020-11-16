import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }  from '../../Containers/TodoInput/todoSlice';
import { connect, useSelector} from 'react-redux';
import { Input, Label } from 'reactstrap';

const mapDispatch = { remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }
 
 function retrieve(condition = "") {
    let x = localStorage.getItem('keys') ? localStorage.getItem('keys') : 0
    if(!x) return [] 
    let g
    switch (condition) {
    case '1':
      g = JSON.parse(x).filter((el) => el.checked === false)
      return g
    case '2':
      g = JSON.parse(x).filter((el) => el.checked === true)
      return g
    default:
      g = JSON.parse(x)
      return g
    }
 }

const TodoItem = ({ markAsChecked, remove, checkAll, clearCompleted, all, todo, completed }) => { 
  let mode = localStorage.getItem('mode')
  const posts = useSelector((state) => retrieve(mode))
  if (!localStorage.getItem('mode')) {return null}
  let check_counter = 0
  let checked_counter = JSON.parse(localStorage.getItem('keys')).filter((e) => e.checked === true).length
  let unchecked_counter = JSON.parse(localStorage.getItem('keys')).filter((e) => e.checked === false).length
  return (
    <div>
      <ul id="ll" className="list-group list-group-flush">
      {posts.map((value, index) => {
        if (!value.checked) check_counter++;
        return (
        <li className={"item list-group-item " + (value.checked ? 'crossed' : 'no-cross')}key={index}> 
          {/* <label  ></label> */}
          <input type="checkbox" className="in-item option-input checkbox" onClick={e => {console.log(value.id); markAsChecked(value.id)}} checked={value.checked}/>
          <div className='text'>{value.text}</div>
          <div className="trash"><FontAwesomeIcon className="crossed" type="button" id="trash" icon={faTrashAlt} onClick={() => remove(value.id)}/></div>
        </li>
        )
      })} 
        
      </ul>
      <li id="last" className="list-group-item">
          <div id="btn-gr" className="btn-group btn-group-toggle">
            <i type='button' id="task_left" onClick={() => checkAll()}>{unchecked_counter} Tasks left</i>
            <Label className={"btn btn-sm "+(!mode || mode === "0" ? "btn-success" : "btn-secondary")}>
              <Input type="radio" clicked name="options" id="option1" onClick={() => all()}/>All
            </Label>
            <Label className={"btn btn-sm " +(mode === "1" ? "btn-success" : "btn-secondary")}>
              <Input type="radio" name="options" id="option1" className="center_btn" onClick={() => todo()}/>ToDo
            </Label>
            <Label id="btns" className={"btn btn-sm "+(mode === "2" ? "btn-success" : "btn-secondary")}>
              <Input type="radio" name="options" id="option1" className="center_btn" onClick={() => completed()}/>Completed
            </Label>
            <i type='button' id="clear" onClick={() => clearCompleted()}>{checked_counter ? 'Clear completed': null}</i>
          </div>
        </li>
    </div>
  )
}

export default connect(null, mapDispatch)(TodoItem)
