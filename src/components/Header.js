import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Header = ({ incompleteCount, completeCount, navigation, selectedDate }) => {
  const [inputText, setInputText] = useState('');
  const { t } = useTranslation();
  const colors = useSelector((state) => state.theme.colors);

  const placeholderText = 'Enter date';
  const calendarButtonText = t('text.calendar');
  const incompleteLabel = t('text.incompleteLower');
  const completeLabel = t('text.completedLower');

  useEffect(() => {
    if (selectedDate) {
      setInputText(selectedDate);
    }
  }, [selectedDate]);

  return (
    <View style={styles.header(colors)}>
      <View style={styles.headerRow}>
        <TextInput
          style={styles.title(colors)}
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholderText}
          placeholderTextColor={colors.headerPlaceholder}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.calendarButton(colors)}>{calendarButtonText}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle(colors)}>
        {incompleteCount} {incompleteLabel}, {completeCount} {completeLabel}
      </Text>
      <View style={styles.line(colors)} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: (colors) => ({
    width: '100%',
    padding: 0,
    marginTop: 0,
    backgroundColor: colors.headerBackground,
  }),
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  title: (colors) => ({
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'inter',
    marginTop: 76,
    color: colors.titleStyle,
  }),
  calendarButton: (colors) => ({
    fontSize: 16,
    color: colors.calendar,
  }),
  subtitle: (colors) => ({
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'inter',
    marginTop: 11,
    marginLeft: 18,
    color: colors.subtitleStyle,
  }),
  line: (colors) => ({
    height: 2,
    width: 343,
    marginTop: 16,
    marginLeft: 18,
    borderRadius: 5,
    backgroundColor: colors.lineStyle,
  }),
});

export default Header;
