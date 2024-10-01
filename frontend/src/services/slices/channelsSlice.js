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
    addStartChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannels: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    setActiveChannel: (state, action) => {
      state.channelId = Number(action.payload);
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (state.channelId === Number(id)) {
        state.channelId = 1;
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const updateChannels = state.channels
        .map((channel) => ((channel.id === id) ? { ...channel, name } : channel));
      state.channels = updateChannels;
    },
  },
});

export const {
  addStartChannels, addChannels, setActiveChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
