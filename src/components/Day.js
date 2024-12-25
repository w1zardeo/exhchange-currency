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
  // const tasks = tasksByDate[`${month} ${day}, ${year}`] || { incomplete: [], complete: [] };
  const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Формат YYYY-MM-DD
  const tasks = tasksByDate[dateKey] || { incomplete: [], complete: [] };
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
          selectedDate: dateKey, 
          isDarkMode: colors.isDarkMode 
        })
      }
      styles={styles}
      colors={colors}
    />
  );
};

export default Day;


// import React from 'react';
// import DayCircle from './DayCircle';

// const Day = ({
//   day,
//   month,
//   year,
//   tasksByDate,
//   isToday,
//   navigation,
//   styles,
//   colors,
// }) => {
//   // Форматуємо дату у стандартний ISO формат (YYYY-MM-DD)
//   const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
//   console.log("Форматтед date:", formattedDate);
  
//   // Отримуємо завдання для цієї дати
//   const tasks = tasksByDate[formattedDate] || { incomplete: [], complete: [] };
//   const hasIncompleteTasks = tasks.incomplete.length > 0;
//   const hasCompleteTasks = tasks.complete.length > 0;

//   return (
//     <DayCircle
//       day={day}
//       month={month}
//       isToday={isToday}
//       hasIncompleteTasks={hasIncompleteTasks}
//       hasCompleteTasks={hasCompleteTasks}
//       onPress={() =>
//         navigation.navigate('DayToDoScreen', { 
//           selectedDate: formattedDate,  // Використовуємо ISO формат
//           isDarkMode: colors.isDarkMode 
//         })
//       }
//       styles={styles}
//       colors={colors}
//     />
//   );
// };

// export default Day;
