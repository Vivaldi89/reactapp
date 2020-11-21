import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { todoSlice } from './Containers/TodoInput/todoSlice';



const store = configureStore({
  
  reducer: todoSlice.reducer
});

export default store