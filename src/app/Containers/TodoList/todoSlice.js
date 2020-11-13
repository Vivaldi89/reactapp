import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  tasks: [] //flag_show_if_task_completed (false by default)
  ,  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
};

// let lastId = 0
//Math.round(Math.random()*10000000000),
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => {
      let x = Math.round(Math.random()*10000000000)
      let obj = {
        id: x,  
        text: action.payload,
        checked: false
      }
      let f = []
      f.push(obj)
      if (!localStorage.getItem('keys')) localStorage.setItem('keys', JSON.stringify(f))
      else {
        let v = JSON.parse(localStorage.getItem('keys'))
        v.push(obj)
        localStorage.removeItem('keys')
        localStorage.setItem('keys', JSON.stringify(v))
      }
      return {
        // ...initialState.tasks, 
        tasks: [...state.tasks,{
          id: x,  //Math.round(Math.random()*10000000000),
          text: action.payload,
          checked: false
        }],
      }
      },
    remove: (state, action) => {
      let id = action.payload; // todo implement function for remove todo from the list
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = []
      for (let i = 0; i < v.length; i++) {
        if (v[i].id != id) newStorage.push(v[i])
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },
    markAsChecked: (state, action) => {
      return state + 1  // todo implement function for mark task checked by id
    },
    clearCompleted: state => {
      return state + 1  //todo implement funciton for remove all completed (checked ) tasks
    },
    checkAll: state => {
      return state + 1
    }
  },
});

export const {add, remove} = todoSlice.actions;


export default todoSlice.reducer;
