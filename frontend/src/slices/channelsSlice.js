/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import unionBy from 'lodash/unionBy';

const initialState = {
  channels: [],
  channelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      state.channels = unionBy(state.channels, action.payload, 'id');
    },
    setActiveChannel: (state, action) => {
      state.channelId = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addChannels, setActiveChannel } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;
