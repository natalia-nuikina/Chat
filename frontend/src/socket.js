import { io } from 'socket.io-client';
import axios from 'axios';
import routes from './routes.js';
import { getAuthHeader } from './Components/helpers.js';
import {
  addChannels, removeChannel, renameChannel,
} from './slices/channelsSlice.js';
import { addMessages, removeMessages } from './slices/messagesSlice.js';

const Socket = async (setConnectState, notify, t, dispatch) => {
  const fetchData = async () => {
    setConnectState(true);
    const startChannels = await axios.get(routes.channelsPath(), { headers: getAuthHeader() })
      .catch(() => {
        notify(`${t('toasts.error')}`, true, true);
      });
    const startMessages = await axios.get(routes.messagesPath(), { headers: getAuthHeader() })
      .catch(() => {
        notify(`${t('toasts.error')}`, true, true);
      });
    setConnectState(false);
    if (startChannels) {
      dispatch(addChannels(startChannels.data));
    }
    if (startMessages) {
      dispatch(addMessages(startMessages.data));
    }
  };

  const sockett = io();

  const onNewMessage = (payload) => {
    dispatch(addMessages(payload));
  };
  const onNewChannel = (payload) => {
    dispatch(addChannels(payload));
  };
  const onRemoveChannel = (payload) => {
    dispatch(removeChannel(payload));
    dispatch(removeMessages(payload));
  };
  const onRenameChannel = (payload) => {
    dispatch(renameChannel(payload));
  };

  const onConnect = () => {
    fetchData();
    sockett.on('newMessage', onNewMessage);
    sockett.on('newChannel', onNewChannel);
    sockett.on('removeChannel', onRemoveChannel);
    sockett.on('renameChannel', onRenameChannel);
  };

  const onDisconnect = () => {
    sockett.off('newMessage', onNewMessage);
    sockett.off('newChannel', onNewChannel);
    sockett.off('removeChannel', onRemoveChannel);
    sockett.off('renameChannel', onRenameChannel);
  };

  sockett.on('connect', onConnect);
  sockett.on('disconnect', onDisconnect);

  return () => {
    sockett.off('connect', onConnect);
    sockett.off('disconnect', onDisconnect);
  };
};

export default Socket;
