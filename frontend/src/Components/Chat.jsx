import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { addChannels } from '../slices/channelsSlice.js';
import { addMessages, setCurrentText } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

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
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { username } = userId;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const channels = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      const messages = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
      dispatch(addChannels(channels.data));
      dispatch(addMessages(messages.data));
    };
    fetchData();
  }, [dispatch]);

  const GetActiveChannel = () => {
    const idActiveChannel = useSelector((state) => state.channelsReducer.idActiveChannel);
    const [activeChannel] = useSelector((state) => state.channelsReducer.channels)
      .filter((channel) => Number(channel.id) === Number(idActiveChannel));
    return (
      (activeChannel) ? activeChannel.name : null
    );
  };

  const newTextMessage = (e) => {
    dispatch(setCurrentText(e.target.value));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const { idActiveChannel } = channelsReducer;
    const { currentText } = messagesReducer;
    dispatch(addMessages({ message: currentText, username, idActiveChannel }));
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
                <b><GetActiveChannel /></b>
              </p>
              <span className="text-muted">{`${messagesReducer.messages.length} сообщений`}</span>
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
