import { io } from 'socket.io-client';
import { addChannels, removeChannel, renameChannel } from './services/slices/channelsSlice.js';
import { addMessages, removeMessages } from './services/slices/messagesSlice.js';

const DispatchChanges = async (dispatch, setIsConnected) => {
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
    setIsConnected(true);
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
    setIsConnected(false);
  };

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);

  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
  };
};

export default DispatchChanges;
