import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Header = ({ incompleteCount, completeCount, navigation, selectedDate }) => {
  const [inputText, setInputText] = useState('');
  const { t } = useTranslation();
  const colors = useSelector((state) => state.theme.colors); // Використовуємо кольори з Redux

  const calendarButtonText = t('text.calendar');
  const incompleteLabel = t('text.incompleteLower');
  const completeLabel = t('text.completedLower');

  useEffect(() => {
    if (selectedDate) {
      setInputText(selectedDate);
    }
  }, [selectedDate]);

  const styles = useStyles(colors); // Викликаємо useStyles, щоб отримати стилі з кольорами

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
          <Text style={styles.calendarButton}>{calendarButtonText}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        {incompleteCount} {incompleteLabel}, {completeCount} {completeLabel}
      </Text>
      <View style={styles.line} />
    </View>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    header: {
      width: '100%',
      padding: 0,
      marginTop: 0,
      backgroundColor: colors.headerBackground, // Колір фону з Redux
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
      color: colors.titleStyle, // Колір тексту з Redux
    },
    calendarButton: {
      fontSize: 16,
      color: colors.calendar, // Колір кнопки календаря з Redux
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'inter',
      marginTop: 11,
      marginLeft: 18,
      color: colors.subtitleStyle, // Колір підзаголовка з Redux
    },
    line: {
      height: 2,
      width: 343,
      marginTop: 16,
      marginLeft: 18,
      borderRadius: 5,
      backgroundColor: colors.lineStyle, // Колір лінії з Redux
    },
  });

export default Header;
