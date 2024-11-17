import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeStylesCalendar from "../theme/ThemeStylesCalendar"; // Імпортуємо новий компонент зі стилями
import { setTasks } from "../redux/TasksSlice"; // Імпорт дій для завдань
import { setTheme } from "../redux/ThemeSlice"; // Імпорт дій для теми
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/ThemeSlice";
import { useTranslation } from 'react-i18next'; // Імпорт локалізації

const CalendarScreen = ({ navigation }) => {
  const { t } = useTranslation(); // Використання локалізації
  const dispatch = useDispatch();
  const tasksByDate = useSelector((state) => state.tasks);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const today = new Date();
  const themeStylesCalendar = ThemeStylesCalendar({ isDarkMode });
  const { i18n } = useTranslation();

const daysInMonth = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const translatedDaysInMonth = {
  January: t('monthDay.jan'),
  February: t('monthDay.feb'),
  March: t('monthDay.mar'),
  April: t('monthDay.apr'),
  May: t('monthDay.may'),
  June: t('monthDay.jun'),
  July: t('monthDay.jul'),
  August: t('monthDay.aug'),
  September: t('monthDay.sep'),
  October: t('monthDay.oct'),
  November: t('monthDay.nov'),
  December: t('monthDay.dec'),
}

  const daysOfWeek = [t('weekDay.mon'), t('weekDay.tue'), t('weekDay.wed'), t('weekDay.thu'), t('weekDay.fri'), t('weekDay.sat'), t('weekDay.sun')];

  useEffect(() => {
    const loadInitialData = async () => {
      await loadTasks();
      await loadTheme();
    };

    loadInitialData();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasksByDate");
      if (storedTasks) {
        dispatch(setTasks(JSON.parse(storedTasks)));
      }
    } catch (e) {
      console.log("Failed to load tasks.", e);
    }
  };

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("isDarkMode");
      if (savedTheme !== null) {
        dispatch(setTheme(JSON.parse(savedTheme)));
      }
    } catch (e) {
      console.log("Failed to load theme.", e);
    }
  };

  const getFirstDayOfMonth = (month) => {
    const date = new Date(2024, Object.keys(daysInMonth).indexOf(month), 1);
    return date.getDay(); // Отримуємо день тижня (0 для неділі, 1 для понеділка)
  };
  const generateMonthDays = (month) => {
    const days = Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
    const firstDayIndex = getFirstDayOfMonth(month) - 1; // Мінус 1, бо тиждень починається з понеділка
    return Array(firstDayIndex < 0 ? 6 : firstDayIndex).fill(null).concat(days); // Додаємо пусті місця перед 1 числом
  };

  const isToday = (month, day) => {
    const currentMonth = today.toLocaleString("default", { month: "long" });
    return currentMonth === month && today.getDate() === day;
  };

// const getDateKey = (month, day) => {
//   const currentYear = new Date().getFullYear();
//   const monthIndex = Object.keys(daysInMonth).indexOf(month);
//   const date = new Date(currentYear, monthIndex, day);
//   const monthName = date.toLocaleString(i18n.language, { month: 'long' });

//   return `${monthName} ${day}, ${currentYear}`;
// };

// const getDateKey = (month, day) => {
//   // Генеруємо ключ у форматі YYYY-MM-DD
//   const year = 2024;
//   const monthIndex = Object.keys(daysInMonth).indexOf(month);
//   return new Date(year, monthIndex, day).toISOString().split('T')[0]; // Виводимо дату в форматі "YYYY-MM-DD"
// };

const getDateKey = (month, day) => {
  // Генеруємо ключ у форматі YYYY-MM-DD з оригінальних назв місяців
  const year = 2024;
  const monthIndex = Object.keys(daysInMonth).indexOf(month); // Визначаємо індекс місяця
  return new Date(year, monthIndex, day).toISOString().split('T')[0];
};

  
  const getCircleStyle = (hasIncompleteTasks, hasCompleteTasks) => {
    if (hasIncompleteTasks) {
      return { backgroundColor: "red" };
    }
    if (hasCompleteTasks) {
      return { backgroundColor: "green" };
    }
    return { backgroundColor: "transparent" };
  };
  
  const renderMonth = (month) => (
    <View key={month} style={styles.monthContainer}>
      <Text style={[styles.monthText, themeStylesCalendar.textStyle]}>
        {2024} {translatedDaysInMonth[month]}
      </Text>
      <View style={styles.daysGrid}>
        {daysOfWeek.map((dayOfWeek) => (
          <View key={dayOfWeek} style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>{dayOfWeek}</Text>
          </View>
        ))}
        {generateMonthDays(month).map((day, index) => {
          const dateKey = getDateKey(month, day); // Отримуємо універсальний ключ для дати
          const tasks = tasksByDate[dateKey] || { incomplete: [], complete: [] };
          const hasIncompleteTasks = tasks.incomplete.length > 0;
          const hasCompleteTasks = tasks.complete.length > 0;
  
          const isWeekend = new Date(2024, Object.keys(daysInMonth).indexOf(month), day).getDay() === 0 || new Date(2024, Object.keys(daysInMonth).indexOf(month), day).getDay() === 6;
  
          return (
            <View key={index} style={styles.dayContainer}>
              <View
                style={[styles.circleStyle, getCircleStyle(hasIncompleteTasks, hasCompleteTasks)]}
              >
                <Text
                  onPress={() =>
                    navigation.navigate("DayToDoScreen", {
                      selectedDate: `${translatedDaysInMonth[month]} ${day}, 2024`, // Формат "Місяць число, рік" із перекладом// Використовуємо універсальний формат дати
                      dateKey: getDateKey(month, day), 
                      updateTasksState: loadTasks,
                      isDarkMode,
                    })
                  }
                  style={[
                    styles.dayText,
                    isWeekend ? themeStylesCalendar.weekendText : themeStylesCalendar.textStyle,
                  ]}
                >
                  {day}
                </Text>
              </View>
              {isToday(month, day) && (
                <View style={styles.todayContainer}>
                  <Text style={styles.todayText}>Today</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  // const renderMonth = (month) => (
  //   <View key={month} style={styles.monthContainer}>
  //     <Text style={[styles.monthText, themeStylesCalendar.textStyle]}>
  //       {2024} {month}
  //     </Text>
  //     <View style={styles.daysGrid}>
  //       {daysOfWeek.map((dayOfWeek) => (
  //         <View key={dayOfWeek} style={styles.weekDayContainer}>
  //           <Text style={styles.weekDayText}>{dayOfWeek}</Text>
  //         </View>
  //       ))}
  //       {generateMonthDays(month).map((day, index) => {
  //         const date = new Date(
  //           Date.UTC(2024, Object.keys(daysInMonth).indexOf(month), day)
  //         ); // Зміна на Date.UTC

  //         const dayOfWeekIndex = date.getUTCDay(); // Використовуйте getUTCDay для правильної обробки
  //         // console.log(date); // Це повинно вивести правильну дату
  //         // console.log(dayOfWeekIndex); // Це повинно вивести індекс дня тижня (0 - неділя, 1 - понеділок, ...)

  //         const isWeekend = dayOfWeekIndex === 0 || dayOfWeekIndex === 6;
  //         if (isWeekend === true) {
  //           // console.log(isWeekend); // Це повинно вивести true для вихідних
  //         }

  //         const tasks = tasksByDate[`${month} ${day}, 2024`] || {
  //           incomplete: [],
  //           complete: [],
  //         };
  //         const hasIncompleteTasks = tasks.incomplete.length > 0;
  //         const hasCompleteTasks = tasks.complete.length > 0;

  //         const isCurrentDay = isToday(month, day);

  //         return (
  //           <View key={index} style={styles.dayContainer}>
  //             <View
  //               style={[
  //                 styles.circleStyle,
  //                 getCircleStyle(hasIncompleteTasks, hasCompleteTasks), 
  //               ]}
  //             >
  //               <Text
  //                 onPress={() =>
  //                   navigation.navigate("DayToDoScreen", {
  //                     selectedDate: `${month} ${day}, 2024`,
  //                     updateTasksState: loadTasks,
  //                     isDarkMode,
  //                   })
  //                 }
  //                 style={[
  //                   styles.dayText,
  //                   isWeekend
  //                     ? themeStylesCalendar.weekendText
  //                     : themeStylesCalendar.textStyle,
  //                     isToday(month, day) && { color: 'cyan' },
  //                 ]}
  //               >
  //                 {day}
  //               </Text>
  //             </View>
  //             {isToday(month, day) && (
  //               <View style={styles.todayContainer}>
  //                   <Text style={styles.todayText}>Today</Text>
  //               </View>
  //             )}
  //           </View>
  //         );
  //       })}
  //     </View>
  //   </View>
  // );

  const handleToggleTheme = () => {
    const newTheme = !isDarkMode; // Define the new theme value
    dispatch(toggleTheme()); // Update theme in Redux
    saveTheme(newTheme); // Save the new theme
  };

  const saveTheme = async (theme) => {
    try {
      await AsyncStorage.setItem("isDarkMode", JSON.stringify(theme));
    } catch (e) {
      console.log("Failed to save theme.", e);
    }
  };

  return (
    <View style={[styles.container, themeStylesCalendar.containerStyle]}>
      <View style={styles.switchContainer}>
        <Switch
          value={isDarkMode}
          onValueChange={handleToggleTheme}
          thumbColor={isDarkMode ? "#ffcc00" : "#fff"}
          trackColor={{ false: "#767577", true: "#374151" }}
        />
        <Animated.View>
          {isDarkMode ? (
            <Icon name="moon-outline" size={20} color="#fff" />
          ) : (
            <Icon name="sunny-outline" size={20} color="#ffcc00" />
          )}
        </Animated.View> 
      </View>

      <ScrollView>
        {Object.keys(daysInMonth).map((month) => renderMonth(month))}
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
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
    textAlign: "start",
    marginLeft: 8,
  },
  weekDayContainer: {
    width: "14%",
    alignItems: "center",
    marginBottom: 5,
  },
  weekDayText: {
    color: "#575767",
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  dayContainer: {
    width: "14%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 1,
  },
  circleStyle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    textAlign: "center",
  },
  todayContainer: {
    position: "absolute",
    top: 30,
  },
  todayText: {
    color: 'cyan',
    fontSize: 12,
  }
});

export default CalendarScreen;
