// settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    decimalPlaces: 2, // за замовчуванням
    // інші налаштування
  },
  reducers: {
    setDecimalPlaces: (state, action) => {
      state.decimalPlaces = action.payload;
    },
    // інші редюсери
  },
});

export const { setDecimalPlaces } = settingsSlice.actions;

export default settingsSlice.reducer;
