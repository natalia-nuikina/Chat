import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getAuthHeader } from '../helpers';

const Remove = (props) => {
  const { t } = useTranslation();
  const {
    onHide, connectState, setConnectState, notify,
  } = props;
  const removeChannel = ({ modalInfo }) => async () => {
    const { id } = modalInfo.item;
    setConnectState(true);
    const response = await axios.delete(`/api/v1/channels/${id}`, { headers: getAuthHeader() })
      .catch((err) => {
        if (err.code === 'ERR_NETWORK') {
          notify(`${t('toasts.error')}`, true, true)();
        }
      });
    if (response) {
      notify(`${t('toasts.remove')}`, true)();
    }
    setConnectState(false);
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide} disabled={connectState}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.sure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={connectState} variant="secondary" type="reset" onClick={onHide}>
          {t('modals.cansel')}
        </Button>
        <Button disabled={connectState} variant="danger" onClick={removeChannel(props)}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
