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
      if (localStorage.getItem('backup')){
        let x = JSON.parse(localStorage.getItem('backup'))
        x.push(obj)
        localStorage.removeItem('backup')
        localStorage.setItem('backup', JSON.stringify(x))
        return
      }
      f.push(obj)
      if (!localStorage.getItem('keys')) localStorage.setItem('keys', JSON.stringify(f))
      else {
        let v = JSON.parse(localStorage.getItem('keys'))
        v.push(obj)
        localStorage.removeItem('keys')
        localStorage.setItem('keys', JSON.stringify(v))
      }
      return {
        tasks: [...state.tasks,{
          id: x, 
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
        if (v[i].id !== id) newStorage.push(v[i])
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },
    markAsChecked: (state, action) => {
      let id = action.payload;
      let v = JSON.parse(localStorage.getItem('keys'))
      
      let newStorage = []
      for (let i = 0; i < v.length; i++) {
        if (v[i].id === id) {
          let item = {}
          item.id = v[i].id
          item.text = v[i].text
          item.checked = !v[i].checked
          newStorage.push(item)
        }
        else newStorage.push(v[i])
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },
    clearCompleted: state => {
      console.log("clear");
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = []
      if (localStorage.getItem('backup')) {
        let y = JSON.parse(localStorage.getItem('backup'))
        let newBackup = []
        for (let i = 0; i < y.length; i++) {
          let x = {}
          if (y[i].checked !== true){
            x.id = y[i].id
            x.text = y[i].text
            x.checked = y[i].checked
            newBackup.push(x)
          }
        }
        localStorage.removeItem('backup')
        localStorage.setItem('backup', JSON.stringify(newBackup))
      }
      for (let i = 0; i < v.length; i++) {
        let item = {}
        if (v[i].checked === false){
          item.id = v[i].id
          item.text = v[i].text
          item.checked = false
          newStorage.push(item)
        }
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },
    checkAll: state => {
      let v = JSON.parse(localStorage.getItem('keys'))
      let newStorage = []
      
      for (let i = 0; i < v.length; i++) {
        let item = {}
        item.id = v[i].id
        item.text = v[i].text
        item.checked = true
        newStorage.push(item)
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },
    all: state => {
      if (localStorage.getItem('backup')) {
        let v = localStorage.getItem('backup')
        localStorage.removeItem('keys')
        localStorage.setItem('keys', v)
        localStorage.removeItem('backup')
        if (localStorage.getItem('mode')) localStorage.removeItem('mode')
        localStorage.setItem('mode', 0)
      }
      else {
        if (localStorage.getItem('mode')) localStorage.removeItem('mode')
        localStorage.setItem('mode', 0)
        return
      }
    },
    todo: state => {
      if (localStorage.getItem('backup')) {
        let v = localStorage.getItem('backup')
        localStorage.removeItem('keys')
        localStorage.setItem('keys', v)
        if (localStorage.getItem('mode')) localStorage.removeItem('mode')
        localStorage.setItem('mode', 1)
      }
      if (localStorage.getItem('mode')) localStorage.removeItem('mode')
      localStorage.setItem('mode', 1)
      let v = JSON.parse(localStorage.getItem('keys'))
      localStorage.setItem('backup', JSON.stringify(v))
      let newStorage = []
      for (let i = 0; i < v.length; i++) {
        let g = {}
        if (v[i].checked !== true){
          g.id = v[i].id
          g.text = v[i].text
          g.checked = v[i].checked
          newStorage.push(g)
        }
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    },
    completed: state => {
      if (localStorage.getItem('backup')) {
        let v = localStorage.getItem('backup')
        localStorage.removeItem('keys')
        localStorage.setItem('keys', v)
        if (localStorage.getItem('mode')) localStorage.removeItem('mode')
        localStorage.setItem('mode', 2)
      }
      if (localStorage.getItem('mode')) localStorage.removeItem('mode')
      localStorage.setItem('mode', 2)
      let v = JSON.parse(localStorage.getItem('keys'))
      localStorage.setItem('backup', JSON.stringify(v))
      let newStorage = []
      for (let i = 0; i < v.length; i++) {
        let g = {}
        if (v[i].checked !== false){
          g.id = v[i].id
          g.text = v[i].text
          g.checked = v[i].checked
          newStorage.push(g)
        }
      }
      localStorage.removeItem('keys')
      localStorage.setItem('keys', JSON.stringify(newStorage))
    }
  }
});

export const {add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed} = todoSlice.actions;


export default todoSlice.reducer;
