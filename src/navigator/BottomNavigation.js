import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';
import ExchangeCurrencyScreen from '../screens/ExchangeCurrencyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DayToDoScreen from '../screens/DayToDoScreen';
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

const TabBarIcon = ({ focused, icon, colors }) => {
  const styles = useStyles();
  return (
    <Image
      style={[styles.icon, { tintColor: focused ? colors.iconActive : colors.iconInactive }]}
      source={focused ? icon.focused : icon.default}
    />
  );
};

const CustomTabBarButton = ({ onPress, children }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const CalendarStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    <Stack.Screen name="DayToDoScreen" component={DayToDoScreen} />
  </Stack.Navigator>
);

export default function BottomNavigation() {
  const { colors } = useSelector((state) => state.theme);

  const styles = useStyles(colors);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={ICONS.Calendar} colors={colors} />
          ),
        }}
      />
      <Tab.Screen
        name="ExchangeCurrencyScreen"
        component={ExchangeCurrencyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={ICONS.ExchangeCurrency} colors={colors} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={ICONS.Settings} colors={colors} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const useStyles = () => {
  const {colors} = useSelector((state) => state.theme);
  return StyleSheet.create = ({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: colors.black,
    height: 70,
  },
  icon: {
    width: 24,
    height: 24,
  },
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 60,
    width: 60,
    backgroundColor: colors.customButtonBackground,
    position: 'absolute',
    top: -20,
  },
});
}