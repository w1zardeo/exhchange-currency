import React from 'react';
import { View, Text } from 'react-native';

const DayCircle = ({ day, month, isToday, hasIncompleteTasks, hasCompleteTasks, onPress, styles, colors }) => {
  const getCircleStyle = (hasIncompleteTasks, hasCompleteTasks) => {
    if (hasIncompleteTasks) return styles.taskIncomplete;
    if (hasCompleteTasks) return styles.taskComplete;
    return styles.transparent;
  };

  return (
    <View style={styles.dayContainer}>
      <View style={[styles.circleStyle, getCircleStyle(hasIncompleteTasks, hasCompleteTasks)]}>
        <Text
          onPress={onPress}
          style={[
            styles.dayText,
            isToday && { color: colors.today },
          ]}
        >
          {day}
        </Text>
      </View>
    </View>
  );
};

export default DayCircle;
