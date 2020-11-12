import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './app/store';
import todoSlice from './app/Containers/TodoList/todoSlice'

//todo setup Provider here for use store from the './app/store'
// store.subscribe(() => {
//   console.log("sub");
// })
// store.dispatch(
//   {
//     type: "add",
//     payload: {
//       id: 2,
//       text: "fksdjf",
//       checked: false
//     }
//   }
// )
// console.log(store.getState());

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
