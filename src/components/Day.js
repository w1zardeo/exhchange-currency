import React from 'react';
import DayCircle from './DayCircle';

const Day = ({
  day,
  month,
  year,
  tasksByDate,
  isToday,
  navigation,
  styles,
  colors,
}) => {
  const tasks = tasksByDate[`${month} ${day}, ${year}`] || { incomplete: [], complete: [] };
  const hasIncompleteTasks = tasks.incomplete.length > 0;
  const hasCompleteTasks = tasks.complete.length > 0;

  return (
    <DayCircle
      day={day}
      month={month}
      isToday={isToday}
      hasIncompleteTasks={hasIncompleteTasks}
      hasCompleteTasks={hasCompleteTasks}
      onPress={() =>
        navigation.navigate('DayToDoScreen', { 
          selectedDate: `${month} ${day}, ${year}`, 
          isDarkMode: colors.isDarkMode 
        })
      }
      styles={styles}
      colors={colors}
    />
  );
};

export default Day;
