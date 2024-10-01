import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../services/slices/channelsSlice.js';
import { showModal } from '../services/slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const setActive = (id) => () => {
    dispatch(setActiveChannel(id));
  };
  const activeChannel = useSelector((state) => state.channelsReducer.channelId);
  useEffect(() => {
    document.getElementById(activeChannel)?.scrollIntoView();
  }, [activeChannel]);

  const setVariantButton = (id) => ((activeChannel === Number(id)) ? 'secondary' : null);
  const channels = useSelector((state) => state.channelsReducer.channels);

  if (channels) {
    const channelsBox = channels.map((channel) => {
      if (!channel.removable) {
        return (
          <li key={channel.id} className="nav-item w-100">
            <ButtonGroup className="d-flex">
              <Button
                id={channel.id}
                type="button"
                onClick={setActive(Number(channel.id))}
                className="w-100 rounded-0 text-start text-truncate"
                variant={setVariantButton(channel.id)}
              >
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
            <Button
              id={channel.id}
              type="button"
              onClick={setActive(Number(channel.id))}
              className="w-100 rounded-0 text-start text-truncate"
              variant={setVariantButton(channel.id)}
            >
              <span className="me-1">{t('chat.labelChannel')}</span>
              {channel.name}
            </Button>
            <DropdownButton as={ButtonGroup} variant={setVariantButton(channel.id)} title={<span className="visually-hidden">{t('chat.change')}</span>}>
              <Dropdown.Item
                id={channel.id}
                eventKey="1"
                onClick={() => dispatch(showModal({ type: 'removing', item: channel }))}
              >
                {t('chat.delete')}
              </Dropdown.Item>
              <Dropdown.Item
                id={channel.id}
                name={channel.name}
                eventKey="2"
                onClick={() => dispatch(showModal({ type: 'renaming', item: channel }))}
              >
                {t('chat.rename')}
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </li>
      );
    });
    return (
      <ul id="channelsBox" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsBox}
      </ul>
    );
  }
  return null;
};

export default Channels;
