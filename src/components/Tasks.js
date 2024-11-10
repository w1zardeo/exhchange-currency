import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, ScrollView  } from 'react-native';
import Checkbox from './Checkbox';
import ThemeStylesTasks from '../theme/ThemeStylesTasks';
import { useTranslation } from 'react-i18next'; // Імпорт локалізації

const getCategoryEmoji = (category) => {
  switch (category) {
    case 'Finance':
      return '💰';
    case 'Weeding':
      return '💍';
    case 'Freelance':
      return '💻';
    case 'Shopping List':
      return '🛒';
    default:
      return '';
  }
};

const Tasks = ({ tasks, toggleTask, deleteTask, updateTaskText, isDarkMode }) => {
  const themeStylesTasks = ThemeStylesTasks({ isDarkMode });
  const { t } = useTranslation(); // Використання локалізації

  const handleTextChange = (text, index, section) => {
    if (text === '') {
      deleteTask(index, section);
    } else {
      updateTaskText(index, section, text);
    }
  };

  return (
    <View style={styles.tasks}>
      {/* Incomplete Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, themeStylesTasks.sectionStyle]}>{t('text.incompleteUpper')}</Text>
        {tasks.incomplete.length === 0 && (
          <Text style={styles.smallGap}>{t('text.addTask')}</Text>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={tasks.incomplete}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <Checkbox
                isDarkMode={isDarkMode}
                checked={item.completed}
                onChange={() => toggleTask(index, 'incomplete')}
                label={
                  <View style={styles.textContainer}>
                    <TextInput
                      value={item.text}
                      onChangeText={(text) => handleTextChange(text, index, 'incomplete')}
                      style={[styles.taskText, themeStylesTasks.textStyle]}
                      numberOfLines={1}
                      maxLength={100}
                    />
                    <Text style={[styles.categoryText]}>
                      {getCategoryEmoji(item.category)} {item.category}
                    </Text>
                  </View>
                }
              />
              {/* Зображення праворуч від тексту */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
                {item.images && item.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
                ))}
              </ScrollView>
            </View>
          )}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={null}
          scrollEnabled={false}
        />
      </View>

      {/* Completed Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, themeStylesTasks.sectionStyle]}>{t('text.completedUpper')}</Text>
        {tasks.complete.length === 0 && (
          <Text style={styles.smallGap}>{t('text.markTask')}</Text>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={tasks.complete}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <Checkbox
                isDarkMode={isDarkMode}
                checked={item.completed}
                onChange={() => toggleTask(index, 'complete')}
                label={
                  <View style={styles.textContainer}>
                    <Text
                      style={[styles.taskText, styles.completedTaskText, themeStylesTasks.completedTaskStyle]}
                    >
                      {item.text}
                    </Text>
                    {/* Не відображаємо категорію для виконаних завдань */}
                  </View>
                }
              />
              {/* Зображення праворуч від тексту */}
              {item.file && item.file.uri && (
                <Image source={{ uri: item.file.uri }} style={styles.imagePreview} />
              )}
            </View>
          )}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={null}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    flex: 1,
    width: '100%',
    padding: 0,
  },
  sectionContainer: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DADADA',
    fontFamily: 'inter',
    marginTop: 16,
    marginLeft: 18,
  },
  smallGap: {
    color: '#575767',
    fontSize: 14,
    marginBottom: 0,
    fontFamily: 'inter',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  flatList: {
    padding: 0,
    margin: 0,
  },
  listContainer: {
    flexGrow: 0,
    marginBottom: 0,
  },
  taskContainer: {
    flexDirection: 'row', // горизонтальне вирівнювання
    alignItems: 'flex-start', // вирівнювання по верхньому краю
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column', // текст буде в стовпчик
    flex: 1,
    width: '70%', // залишаємо місце для картинки
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    width: '100%',
  },
  completedTaskText: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    paddingBottom: 18,
  },
  categoryText: {
    color: '#575767',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 8,
  },
});

export default Tasks;
