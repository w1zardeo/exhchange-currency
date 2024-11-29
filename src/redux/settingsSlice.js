
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    decimalPlaces: 2, 
  },
  reducers: {
    setDecimalPlaces: (state, action) => {
      state.decimalPlaces = action.payload;
    },
  },
});

export const { setDecimalPlaces } = settingsSlice.actions;

export default settingsSlice.reducer;