import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CustomButton = ({ onPress, title, style }) => {
  const { colors } = useSelector((state) => state.theme);  
  const styles = useStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const useStyles = (colors) => {
  return StyleSheet.create({
    button: {
      width: '100%',
      padding: 12,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: colors.button,
      backgroundColor: colors.buttonBackground,
    },
    buttonText: {
      fontSize: 16,
      color: colors.button,
    }
  });
};

export default CustomButton;
