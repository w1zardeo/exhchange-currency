import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import ExchangeCurrencyScreen from '../screens/ExchangeCurrencyScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
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
        component={CalendarScreen}
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
  );
};

export default BottomNavigation;