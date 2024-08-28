/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash/uniqueId';

const initialState = {
  messages: [],
  currentText: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      const { message, username, idActiveChannel } = action.payload;
      if (message) {
        state.messages = [...state.messages, {
          message, id: uniqueId(), username, idActiveChannel,
        }];
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
