import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'dataPack',
  initialState: {
    time: 0,
    dataSet: null,
  },
  reducers: {
    updateDataPack: (state, action) => {
      state.dataSet = action.payload;
      const t1 = new Date().getTime();
      state.time = t1;
    },

  },
});

// Action creators are generated for each case reducer function
export const {updateDataPack} = dataSlice.actions;
export default dataSlice.reducer;
