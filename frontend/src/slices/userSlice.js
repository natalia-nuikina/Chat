/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';

const initialState = {
  token: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      localStorage.setItem('userId', JSON.stringify(action.payload));
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    logOut: (state) => {
      localStorage.removeItem('userId');
      window.location.href = routes.pages.loginPage();
      state.token = '';
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
