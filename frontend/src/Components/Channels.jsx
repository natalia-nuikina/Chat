import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
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
    return null;
  };
  const channelsQ = useSelector((state) => state.channelsReducer.channels);
  console.log(channelsQ);
  if (channelsQ) {
    const channels = channelsQ.map((channel) => {
      if (!channel.removable) {
        return (
          <li key={channel.id} className="nav-item w-100">
            <ButtonGroup className="d-flex">
              <Button type="button" onClick={setActive(Number(channel.id))} className="w-100 rounded-0 text-start btn text-truncate" variant={setVariantButton(channel.id)}>
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            </ButtonGroup>
          </li>
        );
      }
      return (
        <li key={channel.id} className="nav-item w-100">
          <ButtonGroup className="d-flex show dropdown">
            <Button type="button" onClick={setActive(Number(channel.id))} className="w-100 rounded-0 text-start btn text-truncate" variant={setVariantButton(channel.id)}>
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <DropdownButton as={ButtonGroup} variant={setVariantButton(channel.id)} title="">
              <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
              <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </li>
      );
    });
    return (
      <ul id="channelsBox" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels}
      </ul>
    );
  }
  return null;
};

export default Channels;
