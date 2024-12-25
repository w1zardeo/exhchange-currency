// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {};


// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasksByDate: (state, action) => {
//       const { selectedDate, tasks } = action.payload;
//       state[selectedDate] = tasks || { incomplete: [], complete: [] };
//     },
//     addTask: (state, action) => {
//       const { selectedDate, newTask } = action.payload;
//       if (!state[selectedDate]) {
//         state[selectedDate] = { incomplete: [], complete: [] };
//       }
//       state[selectedDate].incomplete.push({ ...newTask, completed: false });
//     },
//     toggleTask: (state, action) => {
//       const { selectedDate, index, type } = action.payload;
//       const tasks = state[selectedDate];
    
//       if (!tasks || !tasks[type] || index < 0 || index >= tasks[type].length) {
//         console.error('Invalid task index or section');
//         return;
//       }
    
//       if (type === 'incomplete') {
//         const completedTask = tasks.incomplete.splice(index, 1)[0];
//         tasks.complete.push({ ...completedTask, completed: true });
//       } else {
//         const incompleteTask = tasks.complete.splice(index, 1)[0];
//         tasks.incomplete.push({ ...incompleteTask, completed: false });
//       }
//     },
//     updateTaskText: (state, action) => {
//       const { selectedDate, index, section, text } = action.payload;
//       const tasks = state[selectedDate];
    
//       if (!tasks || !tasks[section] || !tasks[section][index]) {
//         console.error('Invalid task section or index');
//         return;
//       }
    
//       tasks[section][index].text = text;
//     },
//     },
//     setTaskImages: (state, action) => {
//       const { selectedDate, taskIndex, section, images } = action.payload;
//       const tasks = state[selectedDate];
      
//       if (tasks) {
//         tasks[section][taskIndex].images = images;
//       }
//     },
//     removeImageFromTask: (state, action) => {
//       const { selectedDate, index, section, imageIndex } = action.payload;
//       const tasks = state[selectedDate];
    
//       if (!tasks || !tasks[section] || !tasks[section][index]) {
//         console.error('Invalid task or section');
//         return;
//       }
    
//       const task = tasks[section][index];
//       if (!task.images || imageIndex < 0 || imageIndex >= task.images.length) {
//         console.error('Invalid image index');
//         return;
//       }
    
//       task.images.splice(imageIndex, 1);
//     },
//     deleteTask: (state, action) => {
//       const { selectedDate, index, section } = action.payload;
//       const tasks = state[selectedDate];
    
//       if (!tasks || !tasks[section] || index < 0 || index >= tasks[section].length) {
//         console.error('Invalid task or section');
//         return;
//       }
    
//       tasks[section].splice(index, 1);
//     },
//   });

// export const { setTasksByDate, addTask, toggleTask, updateTaskText, setTaskImages, removeImageFromTask, deleteTask } = taskSlice.actions;

// export default taskSlice.reducer;

// redux/TasksSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksByDate: (state, action) => {
      const { selectedDate, tasks } = action.payload;
      state[selectedDate] = tasks;
    },
    addTask: (state, action) => {
      const { selectedDate, newTask } = action.payload;
      if (!state[selectedDate]) {
        state[selectedDate] = { incomplete: [], complete: [], blocked: [], reviewed: [] };
      }
      state[selectedDate].incomplete.push(newTask);
    },
    moveTask: (state, action) => {
      const { selectedDate, index, currentSection, newSection } = action.payload;
    
      // Витягнути завдання із поточної секції
      const task = state[selectedDate][currentSection].splice(index, 1)[0];
    
      if (task) {
        task.category = newSection; // Оновлення категорії завдання
    
        if (!state[selectedDate][newSection]) {
          state[selectedDate][newSection] = [];
        }
    
        // Додати завдання в нову секцію
        state[selectedDate][newSection].push(task);
      }
    },
    
      
    
    toggleTask: (state, action) => {
      const { selectedDate, index, type } = action.payload;
      const task = state[selectedDate][type][index];
      task.completed = !task.completed;
    },
    updateTaskText: (state, action) => {
      const { selectedDate, index, section, text } = action.payload;
      state[selectedDate][section][index].text = text;
    },
    deleteTask: (state, action) => {
      const { selectedDate, index, section } = action.payload;
      state[selectedDate][section].splice(index, 1);
    },
  },
});

export const { setTasksByDate, addTask, moveTask, toggleTask, updateTaskText, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
