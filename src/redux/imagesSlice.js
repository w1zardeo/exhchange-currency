
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [], 
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setTaskImages: (state, action) => {
      const { taskIndex, images } = action.payload;
      const task = state.images[taskIndex];
      if (task) {
        task.images = images; 
      }
    },
    removeImageFromTask: (state, action) => {
      const { taskIndex, imageIndex } = action.payload;
      const task = state.images[taskIndex];
      if (task && task.images) {
        task.images = task.images.filter((_, index) => index !== imageIndex); 
      }
    },
  },
});

export const { setTaskImages, removeImageFromTask } = imagesSlice.actions;
export default imagesSlice.reducer;

