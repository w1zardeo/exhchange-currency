import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Checkmark } from './Checkmark'; // ваш компонент для галочки
import useStyles from './useStyles'; // Імпортуємо хук

const Checkbox = ({ checked, onChange, label }) => {
  const styles = useStyles(); // Використовуємо стилі з хука

  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <View style={styles.checkbox}>
        {checked && <Checkmark />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const colors = useSelector((state) => state.theme.colors);

  return StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      marginLeft: 18,
      marginBottom: 2,
      backgroundColor: colors.checkbox,
      borderColor: colors.borderColor,
    },
    label: {
      marginTop: 18,
      marginLeft: 0,
      color: colors.labelColor,
    },
  });
};

export default Checkbox;
