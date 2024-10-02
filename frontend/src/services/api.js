import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes.js';

export const api = createApi({
  reducerPath: 'data',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
      const { userReducer } = getState();
      headers.set('Authorization', `Bearer ${userReducer.token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    startChannels: builder.query({
      query: () => routes.channelsPath(),
    }),
    startMessages: builder.query({
      query: () => routes.messagesPath(),
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        url: routes.messagesPath(),
        body: newMessage,
      }),
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        method: 'POST',
        url: routes.channelsPath(),
        body: newChannel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: routes.channelPath(id),
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        method: 'PATCH',
        url: routes.channelPath(id),
        body: { name },
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        method: 'POST',
        url: routes.loginPath(),
        body: userData,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        method: 'POST',
        url: routes.signupPath(),
        body: userData,
      }),
    }),
  }),
});

export const {
  useStartChannelsQuery,
  useStartMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useRenameChannelMutation,
  useLoginMutation,
  useCreateUserMutation,
} = api;
