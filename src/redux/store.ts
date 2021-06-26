import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slicers/userSlicer';


export default configureStore({
  reducer: {
    user: userReducer,
  },
});