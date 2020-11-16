import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  tasks: [] //flag_show_if_task_completed (false by default)
  ,  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  
  reducers: {

    add: (state, action) => {
      let x = Math.round(Math.random()*10000000000)
      let f = []
      let obj = {
        id: x,  
        text: action.payload,
        checked: false
      }
      f.push(obj)
      if (!localStorage.getItem('keys')) localStorage.setItem('keys', JSON.stringify(f))
      else {
        let v = JSON.parse(localStorage.getItem('keys'))
        v.push(obj)
        localStorage.removeItem('keys')
        localStorage.setItem('keys', JSON.stringify(v))
      }},

    remove: (state, action) => {
      let id = action.payload; // todo implement function for remove todo from the list
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = v.filter((el) => el.id !== id)
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },

    markAsChecked: (state, action) => {
      let id = action.payload;
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = []
      for (let i = 0; i < v.length; i++) {
        if (v[i].id === id) {
          let item = Object.assign({}, v[i], {checked: !v[i].checked})
          newStorage.push(item)
        }
        else newStorage.push(v[i])
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },

    clearCompleted: state => {
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = v.filter((el) => el.checked !== true)
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },

    checkAll: state => {
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = []
      let unchecked = v.filter((el) => el.checked === false)
      if (unchecked.length > 0) {
        for (let i = 0; i < v.length; i++) {
          let item = Object.assign({}, v[i], {checked: true})
          newStorage.push(item)
        }}
      else {
        for (let i = 0; i < v.length; i++) {
          let item = Object.assign({}, v[i], {checked: false})
          newStorage.push(item)
        }
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },

    all: state => {
      if (localStorage.getItem('mode')) localStorage.removeItem('mode')
      localStorage.setItem('mode', 0)
    },

    todo: state => {
      if (localStorage.getItem('mode')) localStorage.removeItem('mode')
      localStorage.setItem('mode', 1)
    },

    completed: state => {
      if (localStorage.getItem('mode')) localStorage.removeItem('mode')
      localStorage.setItem('mode', 2)
    }

  }
});

export const {add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed} = todoSlice.actions;

export default todoSlice.reducer;