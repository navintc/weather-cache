import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'dataPack',
  initialState: {
    time: 0,
    dataSet: null,
    selectedLocation: null
  },
  reducers: {
    updateDataPack: (state, action) => {
      state.dataSet = action.payload;
      const t1 = new Date().getTime();
      state.time = t1;

    },

    selectlocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateDataPack } = dataSlice.actions;
export const { selectlocation } = dataSlice.actions;
export default dataSlice.reducer;