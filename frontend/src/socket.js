import { io } from 'socket.io-client';
import axios from 'axios';
import routes from './routes.js';
import useAuthHeader from './Components/helpers.js';
import {
  addStartChannels, addChannels, removeChannel, renameChannel,
} from './slices/channelsSlice.js';
import { addStartMessages, addMessages, removeMessages } from './slices/messagesSlice.js';

const DispatchChanges = async (notify, t, dispatch) => {
  const headers = useAuthHeader();
  const fetchData = async () => {
    const startChannels = await axios.get(routes.channelsPath(), { headers })
      .catch(() => {
        notify(`${t('toasts.error')}`, true, true);
      });
    const startMessages = await axios.get(routes.messagesPath(), { headers })
      .catch(() => {
        notify(`${t('toasts.error')}`, true, true);
      });
    if (startChannels) {
      dispatch(addStartChannels(startChannels.data));
    }
    if (startMessages) {
      dispatch(addStartMessages(startMessages.data));
    }
  };

  const socket = io();

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
    socket.on('newMessage', onNewMessage);
    socket.on('newChannel', onNewChannel);
    socket.on('removeChannel', onRemoveChannel);
    socket.on('renameChannel', onRenameChannel);
  };

  const onDisconnect = () => {
    socket.off('newMessage', onNewMessage);
    socket.off('newChannel', onNewChannel);
    socket.off('removeChannel', onRemoveChannel);
    socket.off('renameChannel', onRenameChannel);
  };

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);

  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
  };
};

export default DispatchChanges;
