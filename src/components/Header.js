import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import { Plus } from './Plus';

const Header = ({ incompleteCount, completeCount, navigation, selectedDate }) => {
  const [inputText, setInputText] = useState('');
  const { t } = useTranslation();
  const {colors} = useSelector((state) => state.theme);

  useEffect(() => {
    if (selectedDate) {
      setInputText(selectedDate);
    }
  }, [selectedDate]);

  const styles = useStyles(colors); 

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TextInput
          style={styles.title}
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor={colors.headerPlaceholder}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.calendarButton}>{t('text.calendar')}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        {incompleteCount} {t('text.incompleteLower')}, {completeCount} {t('text.completedLower')}
      </Text>
      <View style={styles.line} />
    </View>
  );
};

const useStyles = () => {
  const {colors} = useSelector((state) => state.theme);
  return StyleSheet.create ({
    header: {
      width: '100%',
      padding: 0,
      marginTop: 0,
      backgroundColor: colors.headerBackground, 
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'inter',
      marginTop: 76,
      color: colors.titleStyle, 
    },
    calendarButton: {
      fontSize: 16,
      color: colors.calendar, 
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'inter',
      marginTop: 11,
      marginLeft: 18,
      color: colors.subtitleStyle, 
    },
    line: {
      height: 2,
      width: 343,
      marginTop: 16,
      marginLeft: 18,
      borderRadius: 5,
      backgroundColor: colors.lineStyle,
    },
  });
}

export default Header;