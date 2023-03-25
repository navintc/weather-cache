import {createSlice} from '@reduxjs/toolkit';
export const switcherSlice = createSlice({
  name: 'switcherPack',
  initialState: {
    selectedLocation: null,
  },
  reducers: {
    selectlocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {selectlocation} = switcherSlice.actions;
export default switcherSlice.reducer;
