import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';
import ExchangeCurrencyScreen from '../screens/ExchangeCurrencyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DayToDoScreen from '../screens/DayToDoScreen'; // Імпорт екрану
import { Provider } from 'react-redux';
import { store } from '../redux/store';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CalendarStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    <Stack.Screen name="DayToDoScreen" component={DayToDoScreen} />
  </Stack.Navigator>
);

const BottomNavigation = () => {
  return (
    <Provider store={store}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black', // прозорий чорний колір
          position: 'absolute', // щоб панель була внизу
          bottom: 0, // розміщення внизу
          left: 0,
          right: 0,
          elevation: 0, // для Android, щоб прибрати тінь
          shadowOpacity: 0, // для iOS, щоб прибрати тінь
        },
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ height: 24, width: 24 }}
              source={
                focused
                  ? require('../assets/icon/calendar-blue.png') // активна іконка
                  : require('../assets/icon/calendar-white.png') // неактивна іконка
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExchangeCurrencyScreen"
        component={ExchangeCurrencyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ height: 24, width: 24 }}
              source={
                focused
                  ? require('../assets/icon/exchange-blue.png') // активна іконка
                  : require('../assets/icon/exchange-white.png') // неактивна іконка
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ height: 24, width: 24 }}
              source={
                focused
                  ? require('../assets/icon/settings-blue.png') // активна іконка
                  : require('../assets/icon/settings-white.png') // неактивна іконка
              }
            />
          ),
        }}
      />
      
    </Tab.Navigator>
    </Provider>
  );
};

export default BottomNavigation;