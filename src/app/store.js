import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './Containers/TodoList/todoSlice';


export default configureStore({
  reducer: todoSlice.reducer
    // todo: //todo link here todo reducer from the slice
  
});
