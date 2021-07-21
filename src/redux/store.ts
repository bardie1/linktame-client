import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slicers/userSlicer';
import deviceReducer from "../redux/slicers/deviceSlicer";


export default configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
  },
});