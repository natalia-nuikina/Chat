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
  }),
});

export const { useStartChannelsQuery, useStartMessagesQuery, useAddMessageMutation } = api;
