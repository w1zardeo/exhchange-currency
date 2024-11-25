import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
import { combineReducers } from 'redux';
import themeReducer from './ThemeSlice';
import tasksReducer from './TasksSlice';
import settignsReducer from './settingsSlice';
import imagesReducer from './imagesSlice';
import currencyReducer from './currencySlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  tasks: tasksReducer,
  settings: settignsReducer,
  images: imagesReducer,
  currency: currencyReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['theme', 'tasks', 'images'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['some.path.to.ignore'], 
        ignoredActions: ['persist/PERSIST'], 
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

