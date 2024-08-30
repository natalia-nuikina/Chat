import { React } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ channelsReducer, messagesReducer }) => {
  const props = {
    messagesReducer,
    channelsReducer,
  };
  return props;
};

const Messages = ({ channelsReducer, messagesReducer }) => {
  const { messages } = messagesReducer;
  const { channelId } = channelsReducer;
  if (!messages) {
    return null;
  }
  console.log(messages);

  const messagesBox = messages
    .filter((message) => Number(message.channelId) === Number(channelId))
    .map(({ body, id, username }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        {`: ${body}`}
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

export default connect(mapStateToProps)(Messages);
