import React, {useState} from 'react';
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
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const getCategoryEmoji = category => {
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

const Tasks = ({tasks, toggleTask, deleteTask, updateTaskText, isDarkMode}) => {
  const {t} = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const colors = useSelector(state => state.theme.colors);

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

  const handleImageClick = imageUri => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const renderTaskItem = ({item, index}, section) => (
    <View style={styles.taskContainer}>
      <Checkbox
        isDarkMode={isDarkMode}
        checked={item.completed}
        onChange={() => toggleTask(index, section)}
        label={
          <View style={styles.textContainer}>
            <TextInput
              value={item.text}
              onChangeText={text => handleTextChange(text, index, section)}
              style={[styles.taskText, {color: colors.text}]}
              numberOfLines={1}
              maxLength={100}
            />
            <Text style={styles.categoryText}>
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
        renderItem={({item: image, index: imageIndex}) => (
          <View key={imageIndex} style={styles.imageWrapper}>
            <Image
              source={{uri: image}}
              style={styles.imagePreview}
              onTouchEnd={() => handleImageClick(image)}
            />
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() =>
                handleImageDelete(index, 'incomplete', imageIndex)
              }>
              <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.imagePreviewContainer}
      />
    </View>
  );

  return (
    <View style={styles.tasks}>
      {['incomplete', 'complete'].map(section => (
        <View key={section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            {section === 'incomplete'
              ? t('text.incompleteUpper')
              : t('text.completedUpper')}
          </Text>
          {tasks[section].length === 0 && (
            <Text style={styles.smallGap}>
              {section === 'incomplete'
                ? t('text.addTask')
                : t('text.markTask')}
            </Text>
          )}
          <FlatList
            data={tasks[section]}
            keyExtractor={(item, index) => `${section}-${index}`}
            renderItem={props => renderTaskItem(props, section)}
            contentContainerStyle={styles.flatList}
          />
        </View>
      ))}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalOverlay}>
            <Image source={{uri: selectedImage}} style={styles.modalImage} />
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
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column', 
    flex: 1,
    width: '70%',
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