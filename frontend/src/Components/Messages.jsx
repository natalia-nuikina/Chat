import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  // const { username } = JSON.parse(localStorage.getItem('userId'));
  const { messages } = useSelector((state) => state.messagesReducer);
  const { idActiveChannel } = useSelector((state) => state.channelsReducer);
  if (!messages) {
    return null;
  }
  const messagesBox = messages
    .filter((message) => message.idActiveChannel === idActiveChannel)
    .map(({ message, id, username }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        {`: ${message}`}
      </div>
    ));

  return (
    <div id="messagesBox" className="chat-messages overflow-auto px-5 ">
      <div className="text-break mb-2">
        {messagesBox}
      </div>
    </div>
  );
};

export default Messages;
