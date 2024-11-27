import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';
import ExchangeCurrencyScreen from '../screens/ExchangeCurrencyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DayToDoScreen from '../screens/DayToDoScreen';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Функція для створення іконок
const TabBarIcon = ({ focused, icon }) => (
  <Image
    style={{ height: 24, width: 24 }}
    source={focused ? icon.focused : icon.default}
  />
);

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
            backgroundColor: 'black',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tab.Screen
          name="Calendar"
          component={CalendarStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={{
                  focused: require('../assets/icon/calendar-blue.png'),
                  default: require('../assets/icon/calendar-white.png'),
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ExchangeCurrencyScreen"
          component={ExchangeCurrencyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={{
                  focused: require('../assets/icon/exchange-blue.png'),
                  default: require('../assets/icon/exchange-white.png'),
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={{
                  focused: require('../assets/icon/settings-blue.png'),
                  default: require('../assets/icon/settings-white.png'),
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default BottomNavigation;
