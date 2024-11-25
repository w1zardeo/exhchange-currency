import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setTasksByDate } from '../redux/TasksSlice'; 
import { toggleTheme } from '../redux/ThemeSlice'; 
import { useTranslation } from 'react-i18next'; 

const CalendarScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasksByDate = useSelector(state => state.tasks);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const colors = useSelector((state) => state.theme.colors); 
  const currentYear = new Date().getFullYear(); 

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

  const daysOfWeek = [
    t('weekDay.mon'),
    t('weekDay.tue'),
    t('weekDay.wed'),
    t('weekDay.thu'),
    t('weekDay.fri'),
    t('weekDay.sat'),
    t('weekDay.sun'),
  ];

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  
    const initialTasks = { incomplete: [], complete: [] };
  
    dispatch(setTasksByDate({ selectedDate: today, tasks: initialTasks }));
  }, [dispatch]);

  const getFirstDayOfMonth = month => {
    const date = new Date(currentYear, Object.keys(daysInMonth).indexOf(month), 1);
    return date.getDay(); 
  };

  const generateMonthDays = month => {
    const days = Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
    const firstDayIndex = getFirstDayOfMonth(month) - 1;
    return Array(firstDayIndex < 0 ? 6 : firstDayIndex)
      .fill(null)
      .concat(days);
  };

  const getCircleStyle = (hasIncompleteTasks, hasCompleteTasks) => {
    if (hasIncompleteTasks) return { backgroundColor: colors.taskIncomplete };
    if (hasCompleteTasks) return { backgroundColor: colors.taskComplete };
    return { backgroundColor: colors.transparent };
  };

  const renderMonth = month => (
    <View key={month} style={styles.monthContainer}>
      <Text style={[styles.monthText, { color: colors.text }]}>
        {currentYear} {month}
      </Text>
      <View style={styles.daysGrid}>
        {daysOfWeek.map(dayOfWeek => (
          <View key={dayOfWeek} style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>{dayOfWeek}</Text>
          </View>
        ))}
        {generateMonthDays(month).map((day, index) => {
          const date = new Date(Date.UTC(currentYear, Object.keys(daysInMonth).indexOf(month), day));
          const dayOfWeekIndex = date.getUTCDay();
          const isWeekend = dayOfWeekIndex === 0 || dayOfWeekIndex === 6;

          const tasks = tasksByDate[`${month} ${day}, ${currentYear}`] || { incomplete: [], complete: [] };
          const hasIncompleteTasks = tasks.incomplete.length > 0;
          const hasCompleteTasks = tasks.complete.length > 0;

          const isToday = (month, day) => {
            const today = new Date();
            return today.getDate() === day && today.getMonth() === new Date(Date.UTC(currentYear, Object.keys(daysInMonth).indexOf(month), 1)).getMonth();
          };

          return (
            <View key={index} style={styles.dayContainer}>
              <View style={[styles.circleStyle, getCircleStyle(hasIncompleteTasks, hasCompleteTasks)]}>
                <Text
                  onPress={() =>
                    navigation.navigate('DayToDoScreen', {
                      selectedDate: `${month} ${day}, ${currentYear}`,
                      isDarkMode,
                    })
                  }
                  style={[
                    styles.dayText, {color: colors.text},
                    isWeekend ? colors.weekend : colors.text,
                    isToday(month, day) && { color: colors.today },
                  ]}
                >
                  {day}
                </Text>
              </View>
              {isToday(month, day) && (
                <View style={styles.todayContainer}>
                  <Text style={styles.todayText}>{t('text.today')}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.switchContainer}>
        <Switch
          value={isDarkMode}
          onValueChange={handleToggleTheme}
          thumbColor={colors.switchThumb}
          trackColor={{ false: colors.switchTrack, true: colors.switchTrack }}
        />
        <Animated.View>
          {isDarkMode ? (
            <Icon name="moon-outline" size={20} color={colors.iconMoon} />
          ) : (
            <Icon name="sunny-outline" size={20} color={colors.iconSun} />
          )}
        </Animated.View>
      </View>

      <ScrollView>
        {Object.keys(daysInMonth).map(month => renderMonth(month))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
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
  },
  weekDayContainer: {
    width: '14%',
    alignItems: 'center',
    marginBottom: 5,
  },
  weekDayText: {
    color: '#575767',
    textAlign: 'center',
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
  },
  todayContainer: {
    position: 'absolute',
    top: 30,
  },
  todayText: {
    color: 'cyan',
    fontSize: 12,
  },
});

export default CalendarScreen;
