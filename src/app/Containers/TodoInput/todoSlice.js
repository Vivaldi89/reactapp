import {  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState =
{
  tasks: []
}

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
      if (!localStorage.getItem('mode')) {localStorage.setItem('mode', 0)}
      axios.post('/add', {id: obj.id, text: obj.text, checked: obj.checked})
      // if (!localStorage.getItem('keys')) {
      //   localStorage.setItem('keys', JSON.stringify(f))
      // }
      // else {
      //   let v = JSON.parse(localStorage.getItem('keys'))
      //   if (v.filter((e) => e.text === obj.text).length > 0) return
      //   v.push(obj)
      //   localStorage.setItem('keys', JSON.stringify(v))
      // }},
      state.tasks.push(obj)
      return state
    },

    remove: (state, action) => {
      let id = action.payload; // todo implement function for remove todo from the list
      axios.delete('/del/' + String(id))
      // let v = JSON.parse(localStorage.getItem('keys'))
      // if (v.length === 1) localStorage.removeItem('mode')
      // let newStorage = v.filter((el) => el.id !== id)
      // localStorage.setItem('keys', JSON.stringify(newStorage))
      // const newState = state.tasks.filter((item) => item.id != id)
      // state.tasks = newState
      return state
    },

    markAsChecked: (state, action) => {
      let id = action.payload[0];
      let checked = action.payload[1]
      axios.put('/update/'+id+'/'+checked)
      // let v = JSON.parse(localStorage.getItem('keys'))
      // let newStorage = []
      // for (let i = 0; i < v.length; i++) {
      //   if (v[i].id === id) {
      //     let item = Object.assign({}, v[i], {checked: !v[i].checked})
      //     newStorage.push(item)
      //   }
      //   else newStorage.push(v[i])
      // }
      // localStorage.setItem('keys', JSON.stringify(newStorage))
      // state.tasks = [id]
      return state
    },

    clearCompleted: state => {
      axios.delete('/delcompleted')
      // let v = JSON.parse(localStorage.getItem('keys'))
      // let newStorage = v.filter((el) => el.checked !== true)
      // if (newStorage.length === 0) {
      //   localStorage.removeItem('mode')
      // }
      // localStorage.setItem('keys', JSON.stringify(newStorage))
    },

    checkAll: (state, action) => {
      if (action.payload > 0) axios.put('/checkall')
      else axios.put('/uncheckall')
      // let v = JSON.parse(localStorage.getItem('keys'))
      // let newStorage = []
      // let unchecked = v.filter((el) => el.checked === false)
      // if (unchecked.length > 0) {
      //   for (let i = 0; i < v.length; i++) {
      //     let item = Object.assign({}, v[i], {checked: true})
      //     newStorage.push(item)
      //   }}
      // else {
      //   for (let i = 0; i < v.length; i++) {
      //     let item = Object.assign({}, v[i], {checked: false})
      //     newStorage.push(item)
      //   }
      // }
      // localStorage.setItem('keys', JSON.stringify(newStorage))
    },

    all: state => {
      localStorage.setItem('mode', 0)
    },

    todo: state => {
      localStorage.setItem('mode', 1)
    },

    completed: state => {
      localStorage.setItem('mode', 2)
    },
    
    getData: (state, action) => {
      const x = action.payload
      state.tasks = x
      return state
       
    },
  }
});
// const dispatch = useDispatch()
export const { getTasks, getData, add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed} = todoSlice.actions;

export default todoSlice.reducer;

// export const callapi = () => dispatch => {
//   try {
//     axios.get('/todos').then(data => dispatch(getData(data.data)))
//     // return dispatch(x)
//   } catch (e) {
//     return console.error(e.message);
//   }
// }