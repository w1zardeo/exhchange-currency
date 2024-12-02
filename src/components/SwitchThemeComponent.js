import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SwitchThemeComponent = ({ isDarkMode, onToggleTheme, colors }) => (
  <View style={styles.switchContainer}>
    <Switch
      value={isDarkMode}
      onValueChange={onToggleTheme}
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

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SwitchThemeComponent;
