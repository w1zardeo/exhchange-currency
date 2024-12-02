import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTasksByDate } from '../redux/TasksSlice';
import { toggleTheme } from '../redux/ThemeSlice';
import { useTranslation } from 'react-i18next';
import CalendarHeader from '../components/CalendarHeader';
import Month from '../components/Month';
import DayCircle from '../components/DayCircle';

const CalendarScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasksByDate = useSelector(state => state.tasks);
  const { isDarkMode, colors } = useSelector((state) => state.theme);
  const currentYear = new Date().getFullYear();
  const styles = useStyles(colors);

  const daysInMonth = {
    [t('monthDay.jan')]: 31,
    [t('monthDay.feb')]: 28,
    [t('monthDay.mar')]: 31,
    [t('monthDay.apr')]: 30,
    [t('monthDay.may')]: 31,
    [t('monthDay.jun')]: 30,
    [t('monthDay.jul')]: 31,
    [t('monthDay.aug')]: 31,
    [t('monthDay.sep')]: 30,
    [t('monthDay.oct')]: 31,
    [t('monthDay.nov')]: 30,
    [t('monthDay.dec')]: 31,
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const initialTasks = { incomplete: [], complete: [] };
    dispatch(setTasksByDate({ selectedDate: today, tasks: initialTasks }));
  }, [dispatch]);

  const renderDay = (month, day) => {
    const date = new Date(Date.UTC(currentYear, Object.keys(daysInMonth).indexOf(month), day));
    const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth();
    const tasks = tasksByDate[`${month} ${day}, ${currentYear}`] || { incomplete: [], complete: [] };
    const hasIncompleteTasks = tasks.incomplete.length > 0;
    const hasCompleteTasks = tasks.complete.length > 0;

    return (
      <DayCircle
        key={day}
        day={day}
        month={month}
        isToday={isToday}
        hasIncompleteTasks={hasIncompleteTasks}
        hasCompleteTasks={hasCompleteTasks}
        onPress={() => navigation.navigate('DayToDoScreen', { selectedDate: `${month} ${day}, ${currentYear}`, isDarkMode })}
        styles={styles}
        colors={colors}
      />
    );
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        isDarkMode={isDarkMode}
        handleToggleTheme={handleToggleTheme}
        colors={colors}
        styles={styles}
      />
      <FlatList
        data={Object.keys(daysInMonth)}
        renderItem={({ item }) => (
          <Month
            month={item}
            daysInMonth={daysInMonth}
            tasksByDate={tasksByDate}
            currentYear={currentYear}
            renderDay={renderDay}
            styles={styles}
            colors={colors}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const useStyles = () => {
  const {colors} = useSelector((state) => state.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 30,
      backgroundColor: colors.background,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 10,
    },
    monthContainer: {
      marginBottom: 20,
      borderRadius: 10,
      padding: 10,
    },
    monthText: {
      fontSize: 18,
      marginBottom: 5,
      textAlign: 'start',
      marginLeft: 8,
      color: colors.text,
    },
    weekDayContainer: {
      width: '14%',
      alignItems: 'center',
      marginBottom: 5,
    },
    weekDayText: {
      textAlign: 'center',
      color: colors.weekDay,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    dayContainer: {
      width: '14%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      padding: 1,
    },
    circleStyle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayText: {
      textAlign: 'center',
      color: colors.text,
    },
    todayContainer: {
      position: 'absolute',
      top: 30,
    },
    todayText: {
      fontSize: 11,
      color: colors.today,
    },
    taskIncomplete: {
      backgroundColor: colors.taskIncomplete,
    },
    taskComplete: {
      backgroundColor: colors.taskComplete,
    },
    transparent: {
      backgroundColor: colors.transparent,
    },
    flatListContent: {
      paddingBottom: 20,
    },
  });
};

export default CalendarScreen;
