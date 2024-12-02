import React from 'react';
import { Modal, Image, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ImageModal = ({ isVisible, onClose, imageUri }) => {
  const { colors } = useSelector((state) => state.theme);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.modalOverlay, { backgroundColor: colors.modalOverl }]}>
          <Image source={{ uri: imageUri }} style={styles.modalImage} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default ImageModal;
