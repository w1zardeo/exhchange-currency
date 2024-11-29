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


const CONSTANTS = {
  categories: {
    Finance: '💰',
    Weeding: '💍',
    Freelance: '💻',
    'Shopping List': '🛒',
    default: '',
  },
  placeholders: {
    incomplete: 'text.addTask',
    complete: 'text.markTask',
  },
  titles: {
    incomplete: 'text.incompleteUpper',
    complete: 'text.completedUpper',
  },
};

const getCategoryEmoji = (category) => CONSTANTS.categories[category] || CONSTANTS.categories.default;

const Tasks = ({ tasks, toggleTask, deleteTask, updateTaskText, isDarkMode }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const colors = useSelector((state) => state.theme.colors);

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
        isDarkMode={isDarkMode}
        checked={item.completed}
        onChange={() => toggleTask(index, section)}
        label={
          <View style={styles.textContainer}>
            <TextInput
              value={item.text}
              onChangeText={(text) => handleTextChange(text, index, section)}
              style={[styles.taskText(colors)]}
              numberOfLines={1}
              maxLength={100}
            />
            <Text style={[styles.categoryText(colors)]}>
              {getCategoryEmoji(item.category)} {item.category}
            </Text>
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
              <Text style={[styles.deleteText(colors)]}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.imagePreviewContainer}
      />
    </View>
  );

  const renderTaskSection = (section, titleKey, placeholderKey) => (
    <View key={section}>
      <Text style={[styles.sectionTitle(colors)]}>{t(titleKey)}</Text>
      {tasks[section].length === 0 && (
        <Text style={[styles.smallGap(colors)]}>{t(placeholderKey)}</Text>
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
      {renderTaskSection('incomplete', CONSTANTS.titles.incomplete, CONSTANTS.placeholders.incomplete)}
      {renderTaskSection('complete', CONSTANTS.titles.complete, CONSTANTS.placeholders.complete)}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalOverlay(colors)]}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create = ({
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
  },
  smallGap: (colors) => ({
    fontSize: 14,
    marginLeft: 18,
    color: colors.smallGroup,
  }),
  flatList: {
    padding: 0,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  taskText:  (colors) => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  }),
  categoryText: (colors) => ({
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    color: colors.smallGroup,
  }),
  imageWrapper: {
    position: 'relative',
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
    padding: 5,
  },
  modalOverlay: (colors) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalOverl
  }),
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  deleteText: (colors) => ({
    fontSize: 14,
    color: colors.red,
  }),
  sectionTitle: (colors) => ({
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 18,
    color: colors.text,
  }),
});

export default Tasks;
