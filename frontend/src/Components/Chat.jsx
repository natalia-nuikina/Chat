import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Button, InputGroup, Form,
} from 'react-bootstrap';

import { addChannels } from '../slices/channelsSlice.js';
import { addMessages, setCurrentText } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import socket from '../socket.js';
import ModalAdd from './ModalAdd.jsx';
import getAuthHeader from './helpers.js';

const mapStateToProps = ({ channelsReducer, messagesReducer }) => {
  const props = {
    messagesReducer,
    channelsReducer,
  };
  return props;
};

const PageChat = ({ messagesReducer, channelsReducer }) => {
  const ref = useRef(null);
  const { channelId, channels } = channelsReducer;
  const { messages, currentText } = messagesReducer;
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { username } = userId;
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
  }, []);

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
    if (isConnected) {
      fetchData();
      socket.on('newMessage', (payload) => {
        dispatch(addMessages(payload));
      });
      socket.on('newChannel', (payload) => {
        dispatch(addChannels(payload));
      });
    }
  }, [dispatch, isConnected]);

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
  const logOut = () => {
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    ref.current.focus();
  }, [currentText, channelId]);

  return (
    <>
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                <Button onClick={logOut}>Выйти</Button>
              </div>
            </nav>
            <div className="container my-4 overflow-hidden rounded shadow" style={{ height: '85vh' }}>
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b className="p-2">Каналы</b>
                    <Button type="button" variant="outline-primary" onClick={handleShow}>+</Button>
                  </div>
                  <Channels />
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
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
                      <Form onSubmit={sendMessage} className="py-1 border rounded-2">
                        <InputGroup>
                          <Form.Control ref={ref} name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." value={messagesReducer.currentText} onChange={newTextMessage} className="border-0 p-0 ps-2" />
                          <Button type="submit" variant="outline-primary" className="mt-8">Отправить</Button>
                        </InputGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAdd props={{ show, handleClose }} />
    </>
  );
};

export default connect(mapStateToProps)(PageChat);
