// themeSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const themeSlice = createSlice({
//   name: 'theme',
//   initialState: {
//     isDarkMode: true,
//   },
//   reducers: {
//     toggleTheme: (state) => {
//       state.isDarkMode = !state.isDarkMode;
//     },
//     setTheme: (state, action) => {
//       state.isDarkMode = action.payload;
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;
// export default themeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import DarkTheme from '../theme/DarkTheme';
import DefaultTheme from '../theme/DefaultTheme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: true, // Початковий стан
    colors: DarkTheme, // Початкові кольори
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.colors = state.isDarkMode ? DarkTheme : DefaultTheme; // Перемикаємо кольори
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      state.colors = action.payload ? DarkTheme : DefaultTheme; // Встановлюємо кольори явно
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;



