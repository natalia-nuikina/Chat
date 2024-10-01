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
    addStartMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setCurrentText: (state, action) => {
      state.currentText = action.payload;
    },
    removeMessages: (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages
        .filter((message) => Number(message.channelId) !== Number(id));
    },
  },
});

export const {
  addStartMessages, addMessages, setCurrentText, removeMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
