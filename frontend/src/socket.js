import { io } from 'socket.io-client';
import axios from 'axios';
import routes from './routes.js';
import { getAuthHeader } from './Components/helpers.js';
import {
  addChannels, removeChannel, renameChannel,
} from './slices/channelsSlice.js';
import { addMessages, removeMessages } from './slices/messagesSlice.js';

const Socket = async (setIsConnected, setConnectState, notify, t, dispatch, isConnected) => {
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
  const onConnect = () => {
    setIsConnected(true);
  };
  const onDisconnect = () => {
    setIsConnected(false);
  };

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
  sockett.on('connect', onConnect);
  sockett.on('disconnect', onDisconnect);

  if (isConnected) {
    fetchData();
    sockett.on('newMessage', onNewMessage);
    sockett.on('newChannel', onNewChannel);
    sockett.on('removeChannel', onRemoveChannel);
    sockett.on('renameChannel', onRenameChannel);
  }

  return () => {
    sockett.off('connect', onConnect);
    sockett.off('disconnect', onDisconnect);
    sockett.off('newMessage', onNewMessage);
    sockett.off('newChannel', onNewChannel);
    sockett.off('removeChannel', onRemoveChannel);
    sockett.off('renameChannel', onRenameChannel);
  };
};

export default Socket;
