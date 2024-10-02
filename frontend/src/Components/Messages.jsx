import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './helpers.js';

const Messages = ({ channelsReducer, messagesReducer }) => {
  const messagesEndRef = useRef(null);
  const { messages } = messagesReducer;
  const { channelId } = channelsReducer;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, channelId]);

  if (!messages) {
    return null;
  }
  const messagesBox = messages
    .filter((message) => Number(message.channelId) === Number(channelId))
    .map(({ body, id, username }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        {`: ${body}`}
        <div ref={messagesEndRef} />
      </div>
    ));

  return (
    <div id="messagesBox" className="chat-messages overflow-auto px-5">
      <div className="text-break mb-2">
        {messagesBox}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Messages);
