import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';

const TaskModal = ({ visible, onAddTask, onClose }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Finance');
  const [images, setImages] = useState([]); // Масив для зображень

  const handleAdd = () => {
    if (task.trim()) {
      onAddTask({ text: task, category, completed: false, images });
      setTask('');
      setImages([]); // Очистити масив після додавання
    }
  };

  // Функція для відкриття файлового провідника
  const openFileExplorer = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Обмежуємо вибір зображень
        allowMultiSelection: true, // Дозволяємо вибір кількох файлів
      });
      setImages(res.map(file => file.uri)); // Додаємо вибрані зображення в масив
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add New Task</Text>

          <TextInput
            style={styles.input}
            value={task}
            onChangeText={setTask}
            placeholder="Enter task"
            placeholderTextColor="#B0B0B0"
          />

          <View style={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
            ))}
          </View>

          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="💵 Finance" value="Finance" />
            <Picker.Item label="💍 Weeding" value="Weeding" />
            <Picker.Item label="💼 Freelance" value="Freelance" />
            <Picker.Item label="🛒 Shopping List" value="Shopping List" />
          </Picker>

          <TouchableOpacity style={styles.paperclipButton} onPress={openFileExplorer}>
            <Text style={styles.buttonText}>📎 Add Images</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: '#141419',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2c2c2e',
    color: 'white',
    marginBottom: 10,
    borderRadius: 4,
  },
  picker: {
    width: '100%',
    color: 'white',
    backgroundColor: '#2c2c2e',
    marginBottom: 10,
    borderRadius: 4,
  },
  paperclipButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2c2c2e',
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
    backgroundColor: 'transparent',
    borderColor: '#2563EB',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#2563EB',
    fontSize: 16,
  },
});

export default TaskModal;
