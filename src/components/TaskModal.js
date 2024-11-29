import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';

const INITIAL_CATEGORY = 'Finance';
const CATEGORY_OPTIONS = [
  { labelKey: 'text.finance', value: 'Finance' },
  { labelKey: 'text.weeding', value: 'Weeding' },
  { labelKey: 'text.freelance', value: 'Freelance' },
  { labelKey: 'text.shoppingList', value: 'Shopping List' },
];

const TaskModal = ({ visible, onAddTask, onClose }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState(INITIAL_CATEGORY);
  const [images, setImages] = useState([]);
  const { t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const styles = useStyles(colors);

  const handleAdd = () => {
    if (task.trim()) {
      onAddTask({ text: task, category, completed: false, images });
      setTask('');
      setImages([]);
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const { uri } = response.assets[0];
          setImages((prevImages) => [...prevImages, uri]);
        }
      }
    );
  };

  const renderImages = () =>
    images.map((image, index) => (
      <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
    ));

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{t('text.addNewTask')}</Text>

          <TextInput
            style={styles.input}
            value={task}
            onChangeText={setTask}
            placeholder={t('text.enterTask')}
            placeholderTextColor={colors.placeholder}
          />

          <View style={styles.imagePreviewContainer}>{renderImages()}</View>

          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <Picker.Item
                key={option.value}
                label={t(option.labelKey)}
                value={option.value}
              />
            ))}
          </Picker>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>📎 {t('text.addImages')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>{t('text.addTaskUpper')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{t('text.close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    modalBackdrop: {
      backgroundColor: colors.modalBackdrop,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      width: 300,
      padding: 20,
      borderRadius: 10,
      backgroundColor: colors.sectionBackground,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
      color: colors.text,
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    picker: {
      width: '100%',
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: colors.inputBackground,
      color: colors.text,
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
      borderWidth: 1,
      borderColor: colors.imageBorder,
    },
    button: {
      width: '100%',
      padding: 12,
      marginBottom: 10,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
    },
    buttonText: {
      fontSize: 16,
      color: colors.buttonText,
    },
  });

export default TaskModal;
