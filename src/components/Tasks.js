import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Checkbox from './Checkbox';
import ThemeStylesTasks from '../theme/ThemeStylesTasks';
import { useTranslation } from 'react-i18next'; // Імпорт локалізації
import AsyncStorage from '@react-native-async-storage/async-storage'; // Імпорт AsyncStorage

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
  const [imageDoubleClick, setImageDoubleClick] = useState(null); // Стан для двократного натискання
  const [isModalVisible, setIsModalVisible] = useState(false); // Стан для відображення модального вікна
  const [selectedImage, setSelectedImage] = useState(null); // Стан для вибраного зображення

  // useEffect(() => {
  //   loadImagesFromStorage(); // Завантаження зображень при запуску
  //   console.log(1);
    
  // }, []);

    // Функція для збереження зображень у AsyncStorage
    // const saveImagesToStorage = async (updatedTasks) => {
    //   try {
    //     await AsyncStorage.setItem('tasksImages', JSON.stringify(updatedTasks));
    //   } catch (error) {
    //     console.error('Error saving images:', error);
    //   }
    // };

    //   // Функція для завантаження зображень із AsyncStorage
    //   const loadImagesFromStorage = async () => {
    //     try {
    //       const savedImages = await AsyncStorage.getItem('tasksImages');
    //       console.log("Raw savedImages:", savedImages);
    //       if (savedImages) {
    //         const parsedImages = JSON.parse(savedImages);
    //         if (parsedImages.incomplete && Array.isArray(parsedImages.incomplete)) {
    //           parsedImages.incomplete.forEach((task, index) => {
    //             updateTaskText(index, 'incomplete', task.text);
    //           });
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Error loading images:', error.message); // Logs the specific error message
    //     }
    //   };

  const handleTextChange = (text, index, section) => {
    if (text === '') {
      deleteTask(index, section);
    } else {
      updateTaskText(index, section, text);
    }
  };

  const handleImageDelete = (index, section, imageIndex) => {
    const updatedTasks = [...tasks[section]];
    const task = updatedTasks[index];
    if (task.images && task.images.length > imageIndex) {
      task.images.splice(imageIndex, 1);
      updateTaskText(index, section, task.text);
      // saveImagesToStorage(tasks); // Зберігаємо оновлені зображення після видалення
    }
  };

  const handleImageDoubleClick = (imageUri) => {
    setSelectedImage(imageUri); // Зберігаємо URI зображення для модального вікна
    setIsModalVisible(true); // Відкриваємо модальне вікно
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Закриваємо модальне вікно
    setSelectedImage(null); // Очищаємо вибране зображення
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
                {item.images && item.images.map((image, imageIndex) => (
                  <View key={imageIndex} style={styles.imageWrapper}>
                    <Image
                      source={{ uri: image }}
                      style={styles.imagePreview}
                      onTouchEnd={() => handleImageDoubleClick(image)} // Двократне натискання на зображення
                    />
                    <TouchableOpacity 
                      style={styles.deleteIcon} 
                      onPress={() => handleImageDelete(index, 'incomplete', imageIndex)}
                    >
                      <Text style={styles.deleteText}>❌</Text>
                    </TouchableOpacity>
                  </View>
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
                  </View>
                }
              />
              {/* Зображення праворуч від тексту */}
              {item.file && item.file.uri && (
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.file.uri }}
                    style={styles.imagePreview}
                    onTouchEnd={() => handleImageDoubleClick(item.file.uri)} // Двократне натискання на зображення
                  />
                  <TouchableOpacity 
                    style={styles.deleteIcon} 
                    onPress={() => handleImageDelete(index, 'complete', 0)}
                  >
                    <Text style={styles.deleteText}>❌</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={null}
          scrollEnabled={false}
        />
      </View>
      {/* Modal для перегляду зображення на весь екран */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={handleModalClose}>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalOverlay}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  imageWrapper: {
    position: 'relative', // для розміщення хрестика на зображенні
    marginLeft: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 8,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    // backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  deleteText: {
    color: 'red',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default Tasks;
