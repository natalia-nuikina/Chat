/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentText: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      if (action.payload.length) {
        state.messages = [...state.messages, ...action.payload];
      } else {
        state.messages = [...state.messages, action.payload];
      }
    },
    setCurrentText: (state, action) => {
      state.currentText = action.payload;
    },
    removeMessages: (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages
        .filter((message) => Number(message.channelId) === Number(id));
    },
  },
});

export const { addMessages, setCurrentText, removeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
