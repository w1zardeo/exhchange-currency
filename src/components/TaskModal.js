import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import { useTranslation } from 'react-i18next';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';

// Компонент для кнопки
const CustomButton = ({ onPress, title, style }) => {
  const colors = useSelector((state) => state.theme.colors);
  return (
  <TouchableOpacity style={[styles.button, style, {borderColor: colors.button}, {backgroundColor: colors.buttonBackground}]} onPress={onPress}>
    <Text style={[styles.buttonText, {color: colors.button}]}>{title}</Text>
  </TouchableOpacity>
)};

const TaskModal = ({ visible, onAddTask, onClose }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Finance');
  const [images, setImages] = useState([]);
  const { t } = useTranslation();
  const colors = useSelector((state) => state.theme.colors);

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
      <View style={[styles.modalBackdrop, {backgroundColor: colors.modalBackdrop}]}>
        <View style={[styles.modal, {backgroundColor: colors.modal}]}>
          <Text style={[styles.modalTitle, {color: colors.modalTitle}]}>{t('text.addNewTask')}</Text>

          <TextInput
            style={[styles.input, {backgroundColor: colors.input}, {color: colors.modalTitle}]}
            value={task}
            onChangeText={setTask}
            placeholder={t('text.enterTask')}
            placeholderTextColor={colors.taskModalPlaceholder}
          />

          <View style={styles.imagePreviewContainer}>{renderImages()}</View>

          <Picker
            selectedValue={category}
            style={[styles.picker, {color: colors.modalTitle}, {backgroundColor: colors.input}]}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label={t('text.finance')} value="Finance" />
            <Picker.Item label={t('text.weeding')} value="Weeding" />
            <Picker.Item label={t('text.freelance')} value="Freelance" />
            <Picker.Item label={t('text.shoppingList')} value="Shopping List" />
          </Picker>

          <CustomButton
            onPress={pickImage}
            title={`📎 ${t('text.addImages')}`}
            style={[styles.paperclipButton, {backgroundColor:colors.picker}]}
          />

          <CustomButton onPress={handleAdd} title={t('text.addTaskUpper')} />
          <CustomButton onPress={onClose} title={t('text.close')} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: 300,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 4,
  },
  paperclipButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default TaskModal;
