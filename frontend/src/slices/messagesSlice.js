/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import uniqueId from 'lodash/uniqueId';

const initialState = {
  messages: [],
  currentText: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      // const newMess = action.payload;
      console.log((action.payload));
      if (action.payload.length) {
        state.messages = [...state.messages, ...action.payload];
      } else {
        state.messages = [...state.messages, action.payload];
      }
    },
    setCurrentText: (state, action) => {
      state.currentText = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addMessages, setCurrentText } = messagesSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default messagesSlice.reducer;
