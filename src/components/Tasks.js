import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Checkbox from './Checkbox';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Tasks = ({ tasks, toggleTask, deleteTask, updateTaskText }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { colors } = useSelector((state) => state.theme);

  const styles = useStyles(colors);

  const handleTextChange = (text, index, section) => {
    if (text === '') {
      deleteTask(index, section);
    } else {
      updateTaskText(index, section, text);
    }
  };

  const handleImageDelete = (index, section, imageIndex) => {
    const updatedTasks = [...tasks[section]];
    updatedTasks[index].images.splice(imageIndex, 1);
    updateTaskText(index, section, updatedTasks[index].text);
  };

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const renderTaskItem = ({ item, index }, section) => (
    <View style={styles.taskContainer}>
      <Checkbox
        checked={item.completed}
        onChange={() => toggleTask(index, section)}
        label={
          <View style={styles.textContainer}>
            <TextInput
              value={item.text}
              onChangeText={(text) => handleTextChange(text, index, section)}
              style={styles.taskText}
              numberOfLines={1}
              maxLength={100}
            />
            <Text style={styles.categoryText}>{item.category || ''}</Text>
          </View>
        }
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item.images}
        keyExtractor={(image, imageIndex) => imageIndex.toString()}
        renderItem={({ item: image, index: imageIndex }) => (
          <View key={imageIndex} style={styles.imageWrapper}>
            <Image
              source={{ uri: image }}
              style={styles.imagePreview}
              onTouchEnd={() => handleImageClick(image)}
            />
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleImageDelete(index, section, imageIndex)}
            >
              <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.imagePreviewContainer}
      />
    </View>
  );

  const renderTaskSection = (section, title, placeholder) => (
    <View key={section}>
      <Text style={styles.sectionTitle}>{t(title)}</Text>
      {tasks[section].length === 0 && (
        <Text style={styles.placeholder}>{t(placeholder)}</Text>
      )}
      <FlatList
        data={tasks[section]}
        keyExtractor={(item, index) => `${section}-${index}`}
        renderItem={(props) => renderTaskItem(props, section)}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );

  return (
    <View style={styles.tasks}>
      {renderTaskSection('incomplete', 'text.incompleteUpper', 'text.addTask')}
      {renderTaskSection('complete', 'text.completedUpper', 'text.markTask')}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalOverlay}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    tasks: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      color: colors.text,
    },
    placeholder: {
      fontSize: 14,
      color: colors.placeholder,
      marginLeft: 10,
    },
    flatList: {
      padding: 0,
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    textContainer: {
      flex: 1,
    },
    taskText: {
      fontSize: 16,
      color: colors.text,
    },
    categoryText: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 4,
    },
    imageWrapper: {
      position: 'relative',
      marginLeft: 10,
    },
    imagePreview: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    deleteIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    deleteText: {
      fontSize: 12,
      color: colors.danger,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalImage: {
      width: '90%',
      height: '90%',
      resizeMode: 'contain',
    },
  });

export default Tasks;
