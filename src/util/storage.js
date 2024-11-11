// util/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveImagesToStorage = async (images) => {
  try {
    await AsyncStorage.setItem('images', JSON.stringify(images));
  } catch (error) {
    console.error('Failed to save images to AsyncStorage:', error);
  }
};

export const loadImagesFromStorage = async () => {
  try {
    const images = await AsyncStorage.getItem('images');
    return images ? JSON.parse(images) : [];
  } catch (error) {
    console.error('Failed to load images from AsyncStorage:', error);
    return [];
  }
};
