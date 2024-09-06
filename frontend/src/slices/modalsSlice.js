/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalInfo: { type: null, item: null },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { type, item } = action.payload;
      state.modalInfo = { type, item };
    },
    hideModal: (state) => {
      state.modalInfo = { type: null, item: null };
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
