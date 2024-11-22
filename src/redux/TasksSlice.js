import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksByDate: (state, action) => {
      const { selectedDate, tasks } = action.payload;
      // Переконайтесь, що selectedDate існує, і якщо не існує, ініціалізуйте його
      state[selectedDate] = tasks;
    },
    addTask: (state, action) => {
      const { selectedDate, newTask } = action.payload;
      const currentTasks = state[selectedDate] || { incomplete: [], complete: [] };
      // Додаємо нове завдання в список невиконаних
      currentTasks.incomplete.push({ ...newTask, completed: false });
      state[selectedDate] = currentTasks; // Оновлюємо state
    },
    toggleTask: (state, action) => {
      const { selectedDate, index, type } = action.payload;
      const tasks = state[selectedDate];
      
      // Якщо для цієї дати немає завдань, нічого не робимо
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
      
      if (tasks) {
        tasks[section][index].text = text;
      }
    },
    setTaskImages: (state, action) => {
      const { selectedDate, taskIndex, section, images } = action.payload;
      const tasks = state[selectedDate];
      
      if (tasks) {
        tasks[section][taskIndex].images = images;
      }
    }
  }
});

export const { setTasksByDate, addTask, toggleTask, updateTaskText, setTaskImages } = taskSlice.actions;

export default taskSlice.reducer;