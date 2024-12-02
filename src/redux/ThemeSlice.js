import { createSlice } from '@reduxjs/toolkit';
import DarkTheme from '../theme/DarkTheme';
import DefaultTheme from '../theme/DefaultTheme';

const initialState = {
  isDarkMode: true,
  colors: DarkTheme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.colors = state.isDarkMode ? DarkTheme : DefaultTheme; 
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      state.colors = action.payload ? DarkTheme : DefaultTheme; 
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;



