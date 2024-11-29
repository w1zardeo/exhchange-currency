import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Checkmark } from './Checkmark';
import { useSelector } from 'react-redux';

const Checkbox = ({ checked, onChange, label }) => {
  const colors = useSelector((state) => state.theme.colors);

  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <View
        style={[styles.checkbox(colors)]}
      >
        {checked && <Checkmark />}
      </View>
      <Text style={[styles.label(colors)]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create = ({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  checkbox: (colors) => ({
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
  }),
  label: (colors) => ({
    marginTop: 18,
    marginLeft: 0,
    color: colors.labelColor,
  }),
});

export default Checkbox;