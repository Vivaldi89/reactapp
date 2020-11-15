import React from 'react';
import { connect } from 'react-redux';
import { add }  from './todoSlice';
import { useState } from 'react';

const mapDispatch = {add}

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
class TodoInput extends React.Component {

  constructor() {
    super();
    this.state = {   //todo setup local state
    }
  }
  render() {
    return (
    <div id='add' className="container">
      <AddTodo />
    </div>
    )
  }
}

const mapStateToProps = state => ({});  //todo setup this method for get info from the global state

const mapDispatchToProps = dispatch => ({});  //todo implement this function

export default connect(null, mapDispatch)(AddTodo)