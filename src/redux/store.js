// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import { combineReducers } from 'redux';
// import themeReducer from './ThemeSlice';
// import tasksReducer from './TasksSlice';
// import settignsReducer from './settingsSlice';
// import imagesReducer from './imagesSlice';
// import currencyReducer from './currencySlice';

// const rootReducer = combineReducers({
//   theme: themeReducer,
//   tasks: tasksReducer,
//   settings: settignsReducer,
//   images: imagesReducer,
//   currency: currencyReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, 
//   whitelist: ['theme', 'tasks', 'images'], 
// };


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredPaths: ['some.path.to.ignore'], 
//         ignoredActions: ['persist/PERSIST'], 
//       },
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'; // Import saga middleware
import themeReducer from './ThemeSlice';
import tasksReducer from './TasksSlice';
import settignsReducer from './settingsSlice';
import imagesReducer from './imagesSlice';
import currencyReducer from './currencySlice';
import { watchFetchCurrencies } from './currencySlice'; // Assuming saga is defined in the currencySlice

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  tasks: tasksReducer,
  settings: settignsReducer,
  images: imagesReducer,
  currency: currencyReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'tasks', 'images'], // Persist these reducers
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['persist.storage'], // Avoid serialization issues with persistence
        ignoredActions: ['persist/PERSIST'], // Ignore actions related to persist
      },
    }).concat(sagaMiddleware), // Add sagaMiddleware here
});

// Run the sagas
sagaMiddleware.run(watchFetchCurrencies); // Assuming this is the root saga

// Create persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
