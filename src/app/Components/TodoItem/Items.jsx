import React from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { getTasks, getData, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }  from '../../Containers/TodoInput/todoSlice';
import { connect } from 'react-redux'
import { Input, Label } from 'reactstrap';
import store from '../../store';
import { PropTypes } from 'react';

class Tasks extends React.Component {
  state = {
    tasks: [],
  }

  getMode() {return localStorage.getItem('mode')}
  getUncheckedCounter() {return this.state.tasks.filter((e) => e.checked === false).length}
  getCheckedCounter() {return this.state.tasks.filter((e) => e.checked === true).length}

  syncDB(){
    axios.get(`/todos`)
    .then(res => {
      const tasks = res.data;
      store.dispatch(this.props.getData(tasks));
    })
  }

  componentDidMount() {
    this.syncDB()
  }

  handleMark = (id) => {
    this.syncDB()
      store.dispatch(this.props.markAsChecked(id))
    }

  handleRemove = (id) => {
      this.props.remove(id)
      this.syncDB()
      
  }

  handleAll = () => {
    this.syncDB()
    this.props.all()
  }    
  
  handleTodo = () => {
      this.props.todo()
      this.syncDB()
  }
  handleCompleted = () => {
      this.props.completed()
      this.syncDB()
  }

  fetchData(){
    return store.getState().tasks
  }
  //onLoad={ this.syncDB()}
  
  render() {
    console.log("render")
    return (
        <div>  
            <ul id="ll" className="list-group list-group-flush">
                { this.fetchData().map(task => 
                    <li className={"item list-group-item " + (task.checked ? 'crossed' : 'no-cross')} key={task.id}>
                        <div className="promoted-checkbox">
                            <input id={task.id} type="checkbox" className="promoted-input-checkbox" onClick={e => {this.handleMark(task.id)}} checked={task.checked}/>
                            <label htmlFor={task.id}>
                            <svg>
                                <use xlinkHref='#checkmark' />
                            </svg>
                            </label>
                        </div>
                        <div className='text'>{task.text}</div>
                        <div className="trash"><FontAwesomeIcon className="crossed" type="button" id="trash" onClick={() => this.handleRemove(task.id)} icon={faTrashAlt} /></div>
                    </li>
                )}
            </ul>

            <li id="last" className="list-group-item">
                <div id="btn-gr" className="btn-group btn-group-toggle">
                <i type='button' id="task_left" onClick={() => checkAll()}>{this.getUncheckedCounter()} Tasks left</i>
                <Label className={"center_btn radios btn btn-sm "+(!this.getMode() || this.getMode() === "0" ? "radio_clicked border border-second rounded" : "radio_unclicked")}>
                    <Input type="radio" className="center_btn" id="option1" onClick={() => this.handleAll()}/><p>All</p>
                </Label>
                <Label className={"center_btn radios btn btn-sm " +(this.getMode() === "1" ? "radio_clicked border border-second rounded" : "radio_unclicked")}>
                    <Input type="radio"  className="center_btn" onClick={() => this.handleTodo()}/><p>ToDo</p>
                </Label>
                <Label id="btns" className={"center_btn radios btn btn-sm "+(this.getMode() === "2" ? "radio_clicked border border-second rounded" : "radio_unclicked")}>
                    <Input type="radio" id="last_btn" className="center_btn" onClick={() => this.handleCompleted()}/><p>Completed</p>
                </Label>
                <i type='button' id="clear" onClick={() => clearCompleted()}>{this.getCheckedCounter() ? 'Clear completed': null}</i>
                </div>
            </li>

      </div>
    )  //ret end
  }
}

// const mapStateToProps = (tasks /*, ownProps*/) => {
//     return {
//         tasks: tasks
//     }
//   }
  
// const mapDispatchToProps = { markAsChecked, remove }
  
// export default connect(
//   null,
//     {  getTasks, getData, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed  }
//   )(Tasks)


// Tasks.propTypes = {
//     tasks: PropTypes.bool.isRequired
// };

function mapStateToProps(state, ownProps) {
    return {
        tasks: state.tasks
    };
}

export default connect( mapStateToProps , {  getTasks, getData, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed  })(Tasks);