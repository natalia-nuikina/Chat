/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  channelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      if (state.channels.length === 0) {
        state.channels = action.payload;
      } else {
        state.channels = [...state.channels, action.payload];
        state.channelId = Number(action.payload.id);
      }
      console.log(state.channels);
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
