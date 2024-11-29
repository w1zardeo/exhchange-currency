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
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const ICONS = {
  Calendar: {
    focused: require('../assets/icon/calendar-blue.png'),
    default: require('../assets/icon/calendar-white.png'),
  },
  ExchangeCurrency: {
    focused: require('../assets/icon/exchange-blue.png'),
    default: require('../assets/icon/exchange-white.png'),
  },
  Settings: {
    focused: require('../assets/icon/settings-blue.png'),
    default: require('../assets/icon/settings-white.png'),
  },
};


const TabBarIcon = ({ focused, icon }) => {
  return (
    <Image
      style={{ height: 24, width: 24 }}
      source={focused ? icon.focused : icon.default}
    />
  );
};

const CalendarStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    <Stack.Screen name="DayToDoScreen" component={DayToDoScreen} />
  </Stack.Navigator>
);

const BottomNavigation = () => {
  const colors = useSelector((state) => state.theme.colors);
  const tabBarStyle = {
    backgroundColor: colors.black,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    shadowOpacity: 0,
  };

  return (
    <Provider store={store}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: tabBarStyle,
        }}
      >
        <Tab.Screen
          name="Calendar"
          component={CalendarStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={ICONS.Calendar} />
            ),
          }}
        />
        <Tab.Screen
          name="ExchangeCurrencyScreen"
          component={ExchangeCurrencyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={ICONS.ExchangeCurrency} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={ICONS.Settings} />
            ),
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default BottomNavigation;
