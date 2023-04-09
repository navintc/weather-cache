import {configureStore} from '@reduxjs/toolkit';
import switcherReducer from './switcherSlice';

export default configureStore({
  reducer: {
    selectorPack: switcherReducer,
  },
});
