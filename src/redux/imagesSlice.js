// import { createSlice } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const initialState = {
//   images: []  // Default empty array for images
// };

// const imagesSlice = createSlice({
//   name: 'images',
//   initialState,
//   reducers: {
//     setImages(state, action) {
//       state.images = action.payload;
//       // Save images to AsyncStorage
//       AsyncStorage.setItem('images', JSON.stringify(action.payload));
//     },
//     // Other reducers
//   },
// });

// export const { setImages } = imagesSlice.actions;

// // Selectors
// export const selectImages = (state) => state.images.images;

// export default imagesSlice.reducer;

// Function to load images from AsyncStorage
// export const loadImages = async () => {
//   try {
//     const images = await AsyncStorage.getItem('images');
//     return images != null ? JSON.parse(images) : [];
//   } catch (error) {
//     console.error('Failed to load images from AsyncStorage', error);
//     return [];
//   }
// };

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   imageUri: null, // Початкове значення для URI зображення
// };

// const imageSlice = createSlice({
//   name: 'image',
//   initialState,
//   reducers: {
//     setImage: (state, action) => {
//       state.imageUri = action.payload; // Зберігаємо URI зображення
//     },
//     removeImage: (state) => {
//       state.imageUri = null; // Видаляємо URI зображення
//     },
//   },
// });

// export const { setImage, removeImage } = imageSlice.actions;
// export default imageSlice.reducer;

// redux/imagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [], // Можна зберігати масив зображень
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setTaskImages: (state, action) => {
      const { taskIndex, images } = action.payload;
      const task = state.images[taskIndex];
      if (task) {
        task.images = images; // Оновлюємо масив зображень для завдання
      }
    },
    removeImageFromTask: (state, action) => {
      const { taskIndex, imageIndex } = action.payload;
      const task = state.images[taskIndex];
      if (task && task.images) {
        task.images = task.images.filter((_, index) => index !== imageIndex); // Видаляємо зображення за індексом
      }
    },
  },
});

export const { setTaskImages, removeImageFromTask } = imagesSlice.actions;
export default imagesSlice.reducer;


