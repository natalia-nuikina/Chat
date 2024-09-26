import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import filter from 'leo-profanity';
import getModal from './Modals/index.js';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/index.jsx';
import { setCurrentText } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Socket from '../socket.js';
import { getAuthHeader, mapStateToProps } from './helpers.js';
import routes from '../routes.js';
import { showModal } from '../slices/modalsSlice.js';

const PageChat = ({ messagesReducer, channelsReducer }) => {
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const renderModal = ({ connectState, setConnectState, notify }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return (
      <Component
        connectState={connectState}
        setConnectState={setConnectState}
        notify={notify}
      />
    );
  };
  const auth = useAuth();
  const { t } = useTranslation();
  const [connectState, setConnectState] = useState(false);
  const ref = useRef(null);
  const { channelId, channels } = channelsReducer;
  const { messages, currentText } = messagesReducer;
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { username } = userId;
  const dispatch = useDispatch();
  const notify = (message, move, error = false) => () => {
    if (move) {
      return ((error) ? toast.error(message) : toast.success(message));
    }
    return null;
  };

  useEffect(() => {
    Socket(setConnectState, notify, t, dispatch);
  }, [dispatch, t]);

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
    setConnectState(true);
    const filtedMessage = filter.clean(currentText);
    await axios.post(routes.messagesPath(), {
      body: filtedMessage,
      channelId: channelId.toString(),
      username,
    }, { headers: getAuthHeader() })
      .catch(() => {
        notify(`${t('toasts.error')}`, true, true)();
      });
    setConnectState(false);
    dispatch(setCurrentText(''));
  };

  useEffect(() => {
    ref.current.focus();
  }, [currentText, channelId]);

  return (
    <>
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">{t('logo')}</a>
              <Button onClick={auth.logOut}>{t('chat.logOut')}</Button>
            </div>
          </nav>
          <div className="container my-4 overflow-hidden rounded shadow" style={{ height: '85vh' }}>
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b className="p-2">{t('chat.channels')}</b>
                  <Button
                    disabled={connectState}
                    type="button"
                    variant="outline-primary"
                    onClick={() => dispatch(showModal({ type: 'adding', item: null }))}
                  >
                    {t('chat.add')}
                  </Button>
                </div>
                <Channels />
              </div>
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b>
                        <span className="me-1">{t('chat.labelChannel')}</span>
                        <GetActiveChannel />
                      </b>
                    </p>
                    <span className="text-muted">{t('chat.messages.key', { count: getAmountMessages() })}</span>
                  </div>
                  <Messages />
                  <div className="mt-auto px-5 py-3">
                    <Form onSubmit={sendMessage}>
                      <InputGroup>
                        <Form.Control
                          ref={ref}
                          name="body"
                          aria-label="Новое сообщение"
                          placeholder={t('chat.write')}
                          value={messagesReducer.currentText}
                          onChange={newTextMessage}
                          aria-describedby="basic-addon2"
                        />
                        <Button
                          disabled={messagesReducer.currentText.length === 0}
                          type="submit"
                          variant="outline-primary"
                          id="button-addon2"
                        >
                          {t('chat.send')}
                        </Button>
                      </InputGroup>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      {renderModal({ connectState, setConnectState, notify })}
    </>
  );
};

export default connect(mapStateToProps)(PageChat);
