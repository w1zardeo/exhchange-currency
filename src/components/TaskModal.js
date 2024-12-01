import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
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


const CustomButton = ({ onPress, title, style }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const TaskModal = ({ visible, onAddTask, onClose }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState(INITIAL_CATEGORY);
  const [images, setImages] = useState([]);
  const { t } = useTranslation();
  const styles = useStyles();
  const {colors} = useSelector((state) => state.theme);

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
      <View style={[styles.modalBackdrop]}>
        <View style={[styles.modal]}>
          <Text style={[styles.modalTitle]}>
            {t('text.addNewTask')}
          </Text>

          <TextInput
            style={[styles.input]}
            value={task}
            onChangeText={setTask}
            placeholder={t('text.enterTask')}
            placeholderTextColor={colors.taskModalPlaceholder}
          />

          <View style={styles.imagePreviewContainer}>{renderImages()}</View>

          <Picker
            selectedValue={category}
            style={[styles.picker]}
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

          <CustomButton
            onPress={pickImage}
            title={`📎 ${t('text.addImages')}`}
            style={styles.paperclipButton}
          />

          <CustomButton onPress={handleAdd} title={t('text.addTaskUpper')} />
          <CustomButton onPress={onClose} title={t('text.close')} />
        </View>
      </View>
    </Modal>
  );
};

const useStyles = () =>  {
  const {colors} = useSelector((state) => state.theme);
  return StyleSheet.create ({
    modalBackdrop: {
      backgroundColor: colors.modalBackdrop,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal:{
      width: 300,
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: colors.modal, 
    },
    modalTitle:{
      fontSize: 20,
      marginBottom: 10,
      color: colors.modalTitle, 
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderRadius: 4,
      backgroundColor: colors.input, 
      color: colors.modalTitle,
    },
    picker:{
      width: '100%',
      marginBottom: 10,
      borderRadius: 4,
      backgroundColor: colors.input, 
      color: colors.modalTitle, 
    },
    paperclipButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.picker, 
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
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: colors.button,
      backgroundColor: colors.buttonBackground, 
    },
    buttonText: {
      fontSize: 16,
      color: colors.button,
    }
  });
}

export default TaskModal;