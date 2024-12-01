import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const EditMode = ({ onDrag }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.container} onLongPress={onDrag}>
      <Icon name="menu" size={18} color={styles.icon.color} />
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);
  return StyleSheet.create({
    container: {
      padding: 10,
    },
    icon: {
      color: colors.iconMenu,
    },
  });
};

export default EditMode;
