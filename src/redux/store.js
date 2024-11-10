// store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './TasksSlice';
import themeReducer from './ThemeSlice';
import settignsReducer from './settingsSlice'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
    settings: settignsReducer
  },
});

export default store;
