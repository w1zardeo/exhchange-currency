// ThemeStyles.js
import React from 'react';

const ThemeStylesCurrency = ({ isDarkMode }) => {
  return {
    containerStyle: {
      backgroundColor: isDarkMode ? '#141419' : '#f5f5f5',
    },
    textStyle: {
      color: isDarkMode ? '#ffffff' : '#000000',
    }, 
    labelText: {
      color: isDarkMode ? '#666' : '#c2c2c2'
    },
    rateText: {
      color: isDarkMode ? '#666' : '#c1c1c1'
    },
    sectionStyle: {
      backgroundColor: isDarkMode ? '#1c1c1e' : '#ffffff'
    },
    stylesIconCantainer: {
      backgroundColor: isDarkMode ? '#323136' : '#eeeeee'
    },
    stylesDevider: {
      backgroundColor: isDarkMode ? '#2d2d2f' : '#e0e0e0'
    },
    stylesLine: {
      borderBottomColor: isDarkMode ? '#1a1a1a' : '#e2e2e2'
    },
    searchContainer: {
      backgroundColor: isDarkMode ? '#1c1c1e' : '#eeeeee'
    }
  };
};

export default ThemeStylesCurrency;