// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import tasksReducer from './TasksSlice';
// import themeReducer from './ThemeSlice';
// import settignsReducer from './settingsSlice'
// import imagesReducer from './imagesSlice' 
// import currencyReducer from './currencySlice'; 

// const store = configureStore({
//   reducer: {
//     tasks: tasksReducer,
//     theme: themeReducer,
//     settings: settignsReducer,
//     images: imagesReducer,
//     currencies: currencyReducer
//   },
// });

// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
// import { combineReducers } from 'redux';
// import themeReducer from './ThemeSlice';
// import tasksReducer from './TasksSlice';
// import settignsReducer from './settingsSlice';
// import imagesReducer from './imagesSlice';
// import currencyReducer from './currencySlice';

// // Combine all reducers into one
// const rootReducer = combineReducers({
//   theme: themeReducer,
//   tasks: tasksReducer,
//   settings: settignsReducer,
//   images: imagesReducer,
//   currency: currencyReducer,
// });

// // Configure persistence
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, // Use AsyncStorage
//   whitelist: ['theme', 'tasks'], // Only persist 'theme' and 'tasks'
// };

// // Apply persistReducer to the rootReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// const store = configureStore({
//   reducer: persistedReducer,
// });

// // Create the persistor
// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
import { combineReducers } from 'redux';
import themeReducer from './ThemeSlice';
import tasksReducer from './TasksSlice';
import settignsReducer from './settingsSlice';
import imagesReducer from './imagesSlice';
import currencyReducer from './currencySlice';

// Combine all reducers into one
const rootReducer = combineReducers({
  theme: themeReducer,
  tasks: tasksReducer,
  settings: settignsReducer,
  images: imagesReducer,
  currency: currencyReducer,
});

// Configure persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage
  whitelist: ['theme', 'tasks'], // Only persist 'theme' and 'tasks'
};

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with middleware adjustments
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['some.path.to.ignore'], // Example: adjust to match non-serializable paths
        ignoredActions: ['persist/PERSIST'], // Ignore Redux Persist actions
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

