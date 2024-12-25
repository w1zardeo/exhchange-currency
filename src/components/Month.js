// import React from 'react';
// import { View, Text } from 'react-native';
// import { daysOfWeek } from '../constants/daysOfWeek'; 

// const Month = ({ 
//   month, 
//   daysInMonth, 
//   renderDay, 
//   styles, 
//   colors 
// }) => {

  
//   const generateMonthDays = (monthName) => {
//     const totalDays = daysInMonth[monthName];
//     return Array.from({ length: totalDays }, (_, i) => i + 1);
//   };

//   return (
//     <View style={styles.monthContainer}>
     
//       <Text style={styles.monthText}>
//         {month}
//       </Text>

    
//       <View style={styles.daysGrid}>
//         {daysOfWeek.map((day) => (
//           <View key={day} style={styles.weekDayContainer}>
//             <Text style={styles.weekDayText}>{day}</Text>
//           </View>
//         ))}
//       </View>

     
//       <View style={styles.daysGrid}>
//         {generateMonthDays(month).map((day) =>
//           renderDay(month, day) 
//         )}
//       </View>
//     </View>
//   );
// };

// export default Month;


import React from 'react';
import { View, Text } from 'react-native';
import { daysOfWeek } from '../constants/daysOfWeek'; 

const Month = ({ 
  month, 
  daysInMonth, 
  monthNames, // Отримуємо локалізовані назви місяців
  renderDay, 
  styles, 
  colors 
}) => {

  const generateMonthDays = (month) => {
    const totalDays = daysInMonth[month];
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  return (
    <View style={styles.monthContainer}>
      {/* Відображаємо локалізовану назву місяця */}
      <Text style={styles.monthText}>
        {monthNames[month - 1]} {/* Місяць передається як число, тому беремо month-1 для правильного індексу */}
      </Text>

      <View style={styles.daysGrid}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {generateMonthDays(month).map((day) =>
          renderDay(month, day) 
        )}
      </View>
    </View>
  );
};

export default Month;
