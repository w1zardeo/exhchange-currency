import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import DayCircle from './DayCircle';

const Month = ({ month, daysInMonth, tasksByDate, currentYear, renderDay, styles, colors, navigation }) => {
  const daysOfWeek = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
  ];

  const generateMonthDays = month => {
    const days = Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
    return days;
  };

  return (
    <View key={month} style={styles.monthContainer}>
      <Text style={styles.monthText}>
        {currentYear} {month}
      </Text>
      <View style={styles.daysGrid}>
        {daysOfWeek.map(dayOfWeek => (
          <View key={dayOfWeek} style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>{dayOfWeek}</Text>
          </View>
        ))}
        {generateMonthDays(month).map(day =>
          renderDay(month, day, tasksByDate, currentYear, styles, colors, navigation)
        )}
      </View>
    </View>
  );
};

export default Month;
