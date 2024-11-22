import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksByDate: (state, action) => {
      const { selectedDate, tasks } = action.payload;
      state[selectedDate] = tasks;
    },
    addTask: (state, action) => {
      const { selectedDate, newTask } = action.payload;
      const currentTasks = state[selectedDate] || { incomplete: [], complete: [] };
      currentTasks.incomplete.push({ ...newTask, completed: false });
      state[selectedDate] = currentTasks;
    },
    toggleTask: (state, action) => {
      const { selectedDate, index, type } = action.payload;
      const tasks = state[selectedDate];
      
      if (!tasks) return;

      if (type === 'incomplete') {
        const completedTask = tasks.incomplete.splice(index, 1)[0];
        tasks.complete.push({ ...completedTask, completed: true });
      } else {
        const incompleteTask = tasks.complete.splice(index, 1)[0];
        tasks.incomplete.push({ ...incompleteTask, completed: false });
      }
    },
    updateTaskText: (state, action) => {
      const { selectedDate, index, section, text } = action.payload;
      const tasks = state[selectedDate];
      
      if (tasks && tasks[section] && tasks[section][index]) {
        tasks[section][index].text = text;
      } else {
        console.error('Task not found for the given parameters');
      }
    },
    },
    setTaskImages: (state, action) => {
      const { selectedDate, taskIndex, section, images } = action.payload;
      const tasks = state[selectedDate];
      
      if (tasks) {
        tasks[section][taskIndex].images = images;
      }
    },
    removeImageFromTask: (state, action) => {
      const { selectedDate, index, section, imageIndex } = action.payload;
      const tasks = state[selectedDate];
    
      if (tasks && tasks[section] && tasks[section][index]) {
        const task = tasks[section][index];
        if (task.images && task.images.length > imageIndex) {
          task.images.splice(imageIndex, 1);
        }
      }
    },
    deleteTask: (state, action) => {
      const { selectedDate, index, section } = action.payload;
      const tasks = state[selectedDate];
      if (tasks && tasks[section] && tasks[section][index]) {
        tasks[section].splice(index, 1); 
      }
    },
  });

export const { setTasksByDate, addTask, toggleTask, updateTaskText, setTaskImages, removeImageFromTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;