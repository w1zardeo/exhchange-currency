// imageSlice.js (Redux slice для зберігання зображень)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomplete: [],
  complete: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImageUri: (state, action) => {
      const { index, section, imageUri } = action.payload;
      // Оновлюємо завдання в Redux store із новим URI для зображення
      state[section][index].file = { uri: imageUri };
    },
    // Інші редюсери для управління зображеннями, якщо потрібно
  },
});

export const { setImageUri } = imageSlice.actions;
export default imageSlice.reducer;

