import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../slices/channelsSlice';

const Channels = ({ props }) => {
  const channelsEndRef = useRef(null);
  const { t } = useTranslation();
  const { showModal } = props;
  const dispatch = useDispatch();
  const setActive = (id) => () => {
    dispatch(setActiveChannel(id));
  };
  const activeChannel = useSelector((state) => state.channelsReducer.channelId);
  useEffect(() => {
    console.log(document.getElementById(activeChannel));
    document.getElementById(activeChannel)?.scrollIntoView();
  }, [activeChannel]);

  const setVariantButton = (id) => {
    if (activeChannel === Number(id)) {
      return 'secondary';
    }
    return null;
  };

  const channelsQ = useSelector((state) => state.channelsReducer.channels);
  if (channelsQ) {
    const channels = channelsQ.map((channel) => {
      if (!channel.removable) {
        return (
          <li key={channel.id} className="nav-item w-100">
            <ButtonGroup className="d-flex">
              <Button id={channel.id} type="button" onClick={setActive(Number(channel.id))} className="w-100 rounded-0 text-start btn text-truncate" variant={setVariantButton(channel.id)}>
                <span className="me-1">{t('chat.labelChannel')}</span>
                {channel.name}
              </Button>
            </ButtonGroup>
          </li>
        );
      }
      return (
        <li key={channel.id} className="nav-item w-100">
          <ButtonGroup className="d-flex show dropdown">
            <Button id={channel.id} ref={channelsEndRef} type="button" onClick={setActive(Number(channel.id))} className="w-100 rounded-0 text-start btn text-truncate" variant={setVariantButton(channel.id)}>
              <span className="me-1">{t('chat.labelChannel')}</span>
              {channel.name}
            </Button>
            <DropdownButton as={ButtonGroup} variant={setVariantButton(channel.id)} title="">
              <Dropdown.Item id={channel.id} eventKey="1" onClick={() => showModal('removing', channel)}>{t('chat.delete')}</Dropdown.Item>
              <Dropdown.Item id={channel.id} name={channel.name} eventKey="2" onClick={() => showModal('renaming', channel)}>{t('chat.rename')}</Dropdown.Item>
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
