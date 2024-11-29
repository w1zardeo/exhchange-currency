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

const createDynamicStyles = (colors) => ({
  placeholder: { color: colors.taskModalPlaceholder },
});

const CustomButton = ({ onPress, title, style }) => {
  const colors = useSelector((state) => state.theme.colors);
  return (
    <TouchableOpacity
      style={[styles.button(colors), style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText(colors)]}>{title}</Text>
    </TouchableOpacity>
  );
};

const TaskModal = ({ visible, onAddTask, onClose }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState(INITIAL_CATEGORY);
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
      <View style={[styles.modalBackdrop(colors)]}>
        <View style={[styles.modal(colors)]}>
          <Text style={[styles.modalTitle(colors)]}>
            {t('text.addNewTask')}
          </Text>

          <TextInput
            style={[styles.input(colors)]}
            value={task}
            onChangeText={setTask}
            placeholder={t('text.enterTask')}
            placeholderTextColor={colors.taskModalPlaceholder}
          />

          <View style={styles.imagePreviewContainer}>{renderImages()}</View>

          <Picker
            selectedValue={category}
            style={[styles.picker(colors)]}
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
            style={styles.paperclipButton(colors)}
          />

          <CustomButton onPress={handleAdd} title={t('text.addTaskUpper')} />
          <CustomButton onPress={onClose} title={t('text.close')} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalBackdrop: (colors) => ({
      backgroundColor: colors.modalBackdrop,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    modal:  (colors) => ({
      width: 300,
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: colors.modal, // Додано кольорову динаміку
    }),
    modalTitle: (colors) => ({
      fontSize: 20,
      marginBottom: 10,
      color: colors.modalTitle, // Додано кольорову динаміку
    }),
    input:  (colors) => ({
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderRadius: 4,
      backgroundColor: colors.input, // Додано кольорову динаміку
      color: colors.modalTitle, // Додано кольорову динаміку
    }),
    picker: (colors) => ({
      width: '100%',
      marginBottom: 10,
      borderRadius: 4,
      backgroundColor: colors.input, // Додано кольорову динаміку
      color: colors.modalTitle, // Додано кольорову динаміку
    }),
    paperclipButton: (colors) => ({
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.picker, // Додано кольорову динаміку
    }),
    imagePreviewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 10,
    },
    imagePreview: (colors) => ({
      width: 80,
      height: 80,
      marginHorizontal: 5,
      marginBottom: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.imageBorder, // Додано кольорову динаміку
    }),
    button: (colors) => ({
      width: '100%',
      padding: 12,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: colors.button, // Додано кольорову динаміку
      backgroundColor: colors.buttonBackground, // Додано кольорову динаміку
    }),
    buttonText: (colors) => ({
      fontSize: 16,
      color: colors.button, // Додано кольорову динаміку
    })
  });


export default TaskModal;
