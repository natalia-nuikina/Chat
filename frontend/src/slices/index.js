import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import modalsReducer from './modalsSlice.js';

export default configureStore({
  reducer: {
    messagesReducer,
    channelsReducer,
    modalsReducer,
  },
});
