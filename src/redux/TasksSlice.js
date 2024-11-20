// // tasksSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: {},
//   reducers: {
//     setTasks: (state, action) => {
//       return action.payload;
//     },
//     // Ви можете додати інші редюсери для управління завданнями
//   },
// });

// export const { setTasks } = tasksSlice.actions;
// export default tasksSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   tasksByDate: {}, // Стан для зберігання завдань по датах
// };

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasks(state, action) {
//       state.tasksByDate = action.payload;
//     },
//     addTask(state, action) {
//       const { date, task } = action.payload;
//       if (!state.tasksByDate[date]) {
//         state.tasksByDate[date] = { incomplete: [], complete: [] };
//       }
//       state.tasksByDate[date].incomplete.push(task);
//     },
//     toggleTask(state, action) {
//       const { date, index, type } = action.payload;
//       const task = state.tasksByDate[date][type][index];
//       const newType = type === 'incomplete' ? 'complete' : 'incomplete';
//       state.tasksByDate[date][type].splice(index, 1);
//       state.tasksByDate[date][newType].push({ ...task, completed: !task.completed });
//     },
//     deleteTask(state, action) {
//       const { date, index, type } = action.payload;
//       state.tasksByDate[date][type].splice(index, 1);
//     },
//     updateTaskText(state, action) {
//       const { date, index, type, text } = action.payload;
//       state.tasksByDate[date][type][index].text = text;
//     },
//   },
// });

// export const { setTasks, addTask, toggleTask, deleteTask, updateTaskText } = tasksSlice.actions;
// export default tasksSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {};

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasksByDate: (state, action) => {
//       state[action.payload.selectedDate] = action.payload.tasks;
//     },
//     addTask: (state, action) => {
//       const { selectedDate, newTask } = action.payload;
//       const currentTasks = state[selectedDate] || { incomplete: [], complete: [] };
//       currentTasks.incomplete.push({ ...newTask, completed: false });
//       state[selectedDate] = currentTasks;
//     },
//     toggleTask: (state, action) => {
//       const { selectedDate, index, type } = action.payload;
//       const tasks = state[selectedDate];
//       if (type === 'incomplete') {
//         const completedTask = tasks.incomplete.splice(index, 1)[0];
//         tasks.complete.push({ ...completedTask, completed: true });
//       } else {
//         const incompleteTask = tasks.complete.splice(index, 1)[0];
//         tasks.incomplete.push({ ...incompleteTask, completed: false });
//       }
//       state[selectedDate] = tasks;
//     },
//     updateTaskText: (state, action) => {
//       const { selectedDate, index, type, newText } = action.payload;
//       const tasks = state[selectedDate];
//       tasks[type][index].text = newText;
//       state[selectedDate] = tasks;
//     },
//     deleteTask: (state, action) => {
//       const { selectedDate, index, type } = action.payload;
//       const tasks = state[selectedDate];
//       tasks[type] = tasks[type].filter((_, i) => i !== index);
//       state[selectedDate] = tasks;
//     },
//   },
// });

// export const { setTasksByDate, addTask, toggleTask, updateTaskText, deleteTask } = taskSlice.actions;

// export default taskSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {};

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasksByDate: (state, action) => {
//       state[action.payload.selectedDate] = action.payload.tasks;
//     },
//     addTask: (state, action) => {
//       const { selectedDate, newTask } = action.payload;
//       const currentTasks = state[selectedDate] || { incomplete: [], complete: [] };
//       currentTasks.incomplete.push({ ...newTask, completed: false });
//       state[selectedDate] = currentTasks;
//     },
//     toggleTask: (state, action) => {
//       const { selectedDate, index, type } = action.payload;
//       const tasks = state[selectedDate];
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
//       tasks[section][index].text = text;
//     },
//     // Дія для збереження зображень
//     setTaskImages: (state, action) => {
//       const { selectedDate, taskIndex, section, images } = action.payload;
//       const tasks = state[selectedDate];
//       tasks[section][taskIndex].images = images;
//     }
//   }
// });

// export const { setTasksByDate, addTask, toggleTask, updateTaskText, setTaskImages } = taskSlice.actions;

// export default taskSlice.reducer;

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




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   tasksByDate: {}, // ключ: дата, значення: масив завдань
// };

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasks(state, action) {
//       state.tasksByDate = action.payload;
//     },
//     addTask(state, action) {
//       const { date, task } = action.payload;
//       if (!state.tasksByDate[date]) {
//         state.tasksByDate[date] = [];
//       }
//       state.tasksByDate[date].push(task);
//     },
//     removeTask(state, action) {
//       const { date, taskId } = action.payload;
//       state.tasksByDate[date] = state.tasksByDate[date].filter(
//         (task) => task.id !== taskId
//       );
//     },
//   },
// });

// export const { setTasks, addTask, removeTask } = tasksSlice.actions;
// export default tasksSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   tasksByDate: {}, // ключ: дата, значення: масив завдань
// };

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasks(state, action) {
//       state.tasksByDate = action.payload;
//     },
//     addTask(state, action) {
//       const { date, task } = action.payload;
//       if (!state.tasksByDate[date]) {
//         state.tasksByDate[date] = [];
//       }
//       state.tasksByDate[date].push(task);
//     },
//     removeTask(state, action) {
//       const { date, taskId } = action.payload;
//       state.tasksByDate[date] = state.tasksByDate[date].filter(
//         (task) => task.id !== taskId
//       );
//     },
//     toggleTaskCompletion(state, action) {
//       const { date, taskId } = action.payload;
//       const task = state.tasksByDate[date]?.find((task) => task.id === taskId);
//       if (task) {
//         task.completed = !task.completed;
//       }
//     },
//   },
// });

// export const { setTasks, addTask, removeTask, toggleTaskCompletion } = tasksSlice.actions;
// export default tasksSlice.reducer;
