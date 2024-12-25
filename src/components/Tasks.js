import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Tasks = ({ tasks, onCategoryChange, updateTaskText, deleteTask }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  // Обробка зміни тексту завдання
  const handleTextChange = (text, index, section) => {
    if (text === '') {
      deleteTask(index, section);
    } else {
      updateTaskText(index, section, text);
    }
  };

  // Обробка зміни категорії завдання
  const handleCategoryChange = (index, section, newCategory) => {
    onCategoryChange(index, section, newCategory);
  };

  const renderTaskItem = ({ item, index }, section) => (
    <View style={styles.taskContainer} key={index}>
      {/* Dropdown для зміни категорії */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownSelectedText}
        data={[
          { label: t('text.incompleteUpper'), value: 'incomplete' },
          { label: t('text.completedUpper'), value: 'complete' },
          { label: t('text.blocked'), value: 'blocked' },
          { label: t('text.reviewed'), value: 'reviewed' },
        ]}
        labelField="label"
        valueField="value"
        value={section}
        onChange={(newCategory) => {
          handleCategoryChange(index, section, newCategory.value);
        }}
      />

      {/* Поле для введення тексту завдання */}
      <TextInput
        value={item.text}
        onChangeText={(text) => handleTextChange(text, index, section)}
        style={styles.taskText}
      />
    </View>
  );

  // Рендер секції завдань
  const renderTaskSection = (section, titleKey, placeholderKey) => {
    const sectionTasks = (tasks[section] || []).filter((task) => task !== null && task !== undefined);

    return (
      <View key={section}>
        <Text style={styles.sectionTitle}>{t(titleKey)}</Text>
        {sectionTasks.length === 0 && (
          <Text style={styles.smallGap}>{t(placeholderKey)}</Text>
        )}
        {sectionTasks.map((item, index) => renderTaskItem({ item, index }, section))}
      </View>
    );
  };

  return (
    <View style={styles.tasks}>
      {[
        { section: 'incomplete', titleKey: 'text.incompleteUpper', placeholderKey: 'text.addTask' },
        { section: 'complete', titleKey: 'text.completedUpper', placeholderKey: 'text.markTask' },
        { section: 'blocked', titleKey: 'text.blocked', placeholderKey: 'text.blockedText' },
        { section: 'reviewed', titleKey: 'text.reviewed', placeholderKey: 'text.reviewedText' }
      ].map(({ section, titleKey, placeholderKey }) => (
        renderTaskSection(section, titleKey, placeholderKey)
      ))}
    </View>
  );
};

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);
  return StyleSheet.create({
    tasks: {
      flex: 1,
      width: '100%',
      padding: 0,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginLeft: 18,
      color: colors.text,
    },
    smallGap: {
      fontSize: 14,
      marginLeft: 18,
      color: colors.smallGroup,
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 16,
    },
    taskText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      marginLeft: 10,
    },
    dropdown: {
      width: 150,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
    },
    dropdownPlaceholder: {
      fontSize: 14,
      color: colors.placeholder,
    },
    dropdownSelectedText: {
      fontSize: 14,
      color: colors.text,
    },
  });
};

export default Tasks;
