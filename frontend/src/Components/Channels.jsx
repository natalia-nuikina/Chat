import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setActiveChannel } from '../slices/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const setActive = (id) => () => {
    dispatch(setActiveChannel(id));
  };
  const activeChannel = useSelector((state) => state.channelsReducer.channelId);
  const setVariantButton = (id) => {
    if (activeChannel === Number(id)) {
      return 'secondary';
    }
    return false;
  };
  const channelsQ = useSelector((state) => state.channelsReducer.channels);
  const channels = channelsQ.map((channel) => (
    <li key={channel.id} className="nav-item w-100">
      <Button type="button" onClick={setActive(Number(channel.id))} className="w-100 rounded-0 text-start btn" variant={setVariantButton(channel.id)}>
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  ));

  return (
    <ul id="channelsBox" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels}
    </ul>
  );
};

export default Channels;
