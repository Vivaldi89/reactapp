import React from 'react';
import {connect, useDispatch} from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';
import * as actions  from './todoSlice';
import store from '../../store'
import {add}  from './todoSlice';
/**
 * todo implement component called ToDoInput
 * which should receive onSubmit function which will be called on the press enter key
 * should receive placeholder value which should show as placeholder for the input
 * this input changes should be managed by local state inside ToDoInput component
 * Use this component for enter tasks name
 */
//import ToDoInput from "../../Components/TodoInput/ToDoInput";
import {bindActionCreators} from "../../utils/store";

import './TodoList.css'
import RadioBadge from "../../Components/RadioBadge/RaidoBadge";

/**
 * todo use this list of the control badges to show them at the control panel
 */

import { controlBadges } from '../../constants/todo';
import { useState } from 'react';

const mapDispatch = {add}

/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */


const AddTodo = ({add}) => {
  const [todoText, setTodoText] = useState('')

  const onChange = e => setTodoText(e.target.value)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!todoText.trim()) {
            return
          }
          add(todoText)
          setTodoText('')
        }}
      >
        <input className="inp" value={todoText} onChange={onChange} />
      </form>
    </div>
  )
}
class TodoList extends React.Component {

  constructor() {
    super();
    this.state = {   //todo setup local state
    }
  }
  render() {

    return (
    <div id='add' className="container">
      <AddTodo>
        {/* <TodoItem /> */}
      </AddTodo>
    </div>
    )
  }

}

const mapStateToProps = state => ({});  //todo setup this method for get info from the global state

const mapDispatchToProps = dispatch => ({});  //todo implement this function

// export default connect(null, mapDispatch)(AddTodo)
// export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default connect(null, mapDispatch)(AddTodo)