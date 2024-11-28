import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Header = ({ incompleteCount, completeCount, navigation, selectedDate }) => {
  const [inputText, setInputText] = useState('');
  const { t } = useTranslation();
  const colors = useSelector((state) => state.theme.colors);

  // Константи стилів і текстів
  const placeholderText = 'Enter date';
  const calendarButtonText = t('text.calendar');
  const incompleteLabel = t('text.incompleteLower');
  const completeLabel = t('text.completedLower');

  const dynamicStyles = {
    titleStyle: { color: colors.titleStyle },
    placeholderColor: colors.headerPlaceholder,
    subtitleColor: { color: colors.subtitleStyle },
    lineColor: { backgroundColor: colors.lineStyle },
    calendar: { color: colors.calendar },
  };

  useEffect(() => {
    if (selectedDate) {
      setInputText(selectedDate);
    }
  }, [selectedDate]);

  return (
    <View style={{ width: '100%', padding: 0, marginTop: 0 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18 }}>
        <TextInput
          style={[
            { fontSize: 32, fontWeight: 'bold', fontFamily: 'inter', marginTop: 76 },
            dynamicStyles.titleStyle,
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholderText}
          placeholderTextColor={dynamicStyles.placeholderColor}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Text style={[{ fontSize: 16 }, dynamicStyles.calendar]}>{calendarButtonText}</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[
          { fontSize: 14, fontWeight: 'bold', fontFamily: 'inter', marginTop: 11, marginLeft: 18 },
          dynamicStyles.subtitleColor,
        ]}
      >
        {incompleteCount} {incompleteLabel}, {completeCount} {completeLabel}
      </Text>
      <View
        style={[
          { height: 2, width: 343, marginTop: 16, marginLeft: 18, borderRadius: 5 },
          dynamicStyles.lineColor,
        ]}
      />
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
