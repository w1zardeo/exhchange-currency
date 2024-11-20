// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import BottomNavigation from '../ToDoReact/src/navigator/BottomNavigation';
import CalendarScreen from '../ToDoReact/src/screens/CalendarScreen';
import DayToDoScreen from '../ToDoReact/src/screens/DayToDoScreen';
import { store, persistor } from '../ToDoReact/src/redux/store'; // Використовуємо іменовані імпорти

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen 
              name="Main" 
              component={BottomNavigation} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Calendar" 
              component={CalendarScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="DayToDoScreen" 
              component={DayToDoScreen} 
              options={{ headerShown: false }}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
