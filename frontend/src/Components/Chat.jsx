import axios from 'axios';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { addChannels } from '../slices/channelsSlice.js';
import { addMessages, setCurrentText } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import socket from '../socket.js';

const mapStateToProps = ({ channelsReducer, messagesReducer }) => {
  const props = {
    messagesReducer,
    channelsReducer,
  };
  return props;
};

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const PageChat = ({ messagesReducer, channelsReducer }) => {
  const { channelId, channels } = channelsReducer;
  const { messages, currentText } = messagesReducer;
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { username } = userId;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const startChannels = await axios.get('/api/v1/channels', { headers: getAuthHeader() })
        .catch((err) => {
          console.log(err);
        });
      const startMessages = await axios.get('/api/v1/messages', { headers: getAuthHeader() })
        .catch((err) => {
          console.log(err);
        });
      if (startChannels) {
        dispatch(addChannels(startChannels.data));
      }
      if (startMessages) {
        dispatch(addMessages(startMessages.data));
      }
    };
    fetchData();
    socket.on('newMessage', (payload) => {
      console.log(payload);
      dispatch(addMessages(payload));
    });
    socket.on('newChannel', (payload) => {
      console.log(payload); // { id: 6, name: "new channel", removable: true }
      dispatch(addChannels(payload));
    });
  }, [dispatch]);

  // axios.delete(
  //   '/api/v1/messages/84',
  //   { headers: getAuthHeader() },
  // ).then((response) => {
  //   console.log(response.data); // => { id: '3' }
  // });
  const GetActiveChannel = () => {
    const [activeChannel] = channels.filter((channel) => Number(channel.id) === Number(channelId));
    return (
      (activeChannel) ? activeChannel.name : null
    );
  };
  const getAmountMessages = () => messages
    .filter((message) => Number(message.channelId) === Number(channelId)).length;

  const newTextMessage = (e) => {
    dispatch(setCurrentText(e.target.value));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post('/api/v1/messages', { body: currentText, channelId: channelId.toString(), username }, { headers: getAuthHeader() })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setCurrentText(''));
  };

  return (
    <div className="container h-100% my-4 overflow-hidden rounded shadow">
      <div className="row bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b className="p-2">Каналы</b>
            <Button type="button" variant="outline-primary">+</Button>
          </div>
          <Channels />
        </div>
        <div className="col p-0">
          <div className="d-flex flex-column">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  {'# '}
                  <GetActiveChannel />
                </b>
              </p>
              <span className="text-muted">{`${getAmountMessages()} сообщений`}</span>
            </div>
            <Messages />
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={sendMessage}>
                <InputGroup>
                  <Form.Control ref={(input) => input && input.focus()} autoFocus name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." value={messagesReducer.currentText} onChange={newTextMessage} />
                  <Button type="submit" variant="outline-primary">Отправить</Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(PageChat);
