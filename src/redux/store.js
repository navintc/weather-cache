import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import switcherReducer from './switcherSlice';

export default configureStore({
  reducer: {
    dataPack: dataReducer,
    selectorPack: switcherReducer,
  },
});
