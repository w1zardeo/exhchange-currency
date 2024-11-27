import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next'; 
import { useSelector } from 'react-redux';

const Header = ({ incompleteCount, completeCount, navigation, selectedDate, isDarkMode }) => {
  const [inputText, setInputText] = useState('');
  const { t } = useTranslation(); 
  const colors = useSelector((state) => state.theme.colors); 

  useEffect(() => {
    if (selectedDate) {
      setInputText(selectedDate);
    }
  }, [selectedDate]);

  const dynamicStyles = {
    titleStyle: { color: colors.titleStyle },
    placeholderColor: colors.headerPlaceholder,
    subtitleColor: { color: colors.subtitleStyle },
    lineColor: { backgroundColor: colors.lineStyle },
    calendar: {color: colors.calendar}
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TextInput
          style={[styles.title, dynamicStyles.titleStyle]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter date"
          placeholderTextColor={dynamicStyles.placeholderColor}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Text style={[styles.calendarButton, dynamicStyles.calendar]}>{t('text.calendar')}</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.subtitle, dynamicStyles.subtitleColor]}>
        {incompleteCount} {t('text.incompleteLower')}, {completeCount} {t('text.completedLower')}
      </Text>
      <View style={[styles.line, dynamicStyles.lineColor]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 0,
    marginTop: 0,
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
  },
  calendarButton: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'inter',
    marginTop: 11,
    marginLeft: 18,
  },
  line: {
    height: 2,
    width: 343,
    marginTop: 16,
    marginLeft: 18,
    borderRadius: 5,
  },
});

export default Header;
