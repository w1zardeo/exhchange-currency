import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  images: []  // Default empty array for images
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
      // Save images to AsyncStorage
      AsyncStorage.setItem('images', JSON.stringify(action.payload));
    },
    // Other reducers
  },
});

export const { setImages } = imagesSlice.actions;

// Selectors
export const selectImages = (state) => state.images.images;

export default imagesSlice.reducer;

// Function to load images from AsyncStorage
export const loadImages = async () => {
  try {
    const images = await AsyncStorage.getItem('images');
    return images != null ? JSON.parse(images) : [];
  } catch (error) {
    console.error('Failed to load images from AsyncStorage', error);
    return [];
  }
};
