import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Checkmark } from './Checkmark';
import { useSelector } from 'react-redux';

const Checkbox = ({ checked, onChange, label, isDarkMode }) => {
  const colors = useSelector((state) => state.theme.colors);

  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <View
        style={[
          styles.checkbox,
          { backgroundColor: colors.checkbox, borderColor: colors.borderColor },
        ]}
      >
        {checked && <Checkmark isDarkMode={isDarkMode} />}
      </View>
      <Text style={[styles.label, { color: colors.labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 3,
  },
  label: {
    marginTop: 18,
    marginLeft: 0,
  },
});

export default Checkbox;
