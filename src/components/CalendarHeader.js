import React from 'react';
import { View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CalendarHeader = ({ isDarkMode, handleToggleTheme, colors, styles }) => (
  <View style={styles.switchContainer}>
    <Switch
      value={isDarkMode}
      onValueChange={handleToggleTheme}
      thumbColor={colors.switchThumb}
      trackColor={{ false: colors.switchTrack, true: colors.switchTrack }}
    />
    <Icon
      name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
      size={20}
      color={colors[isDarkMode ? 'iconMoon' : 'iconSun']}
    />
  </View>
);

export default CalendarHeader;
