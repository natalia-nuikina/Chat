import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthHeader } from '../helpers.js';
import routes from '../../routes.js';
import { hideModal } from '../../slices/modalsSlice.js';

const Remove = (props) => {
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notify } = props;
  const headers = getAuthHeader();
  const removeChannel = () => async () => {
    const { id } = modalInfo.item;
    const response = await axios.delete(routes.channelPath(id), { headers })
      .catch((err) => {
        if (err.code === 'ERR_NETWORK') {
          notify(`${t('toasts.error')}`, true, true)();
        }
      });
    if (response) {
      notify(`${t('toasts.remove')}`, true)();
    }
    dispatch(hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.sure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={() => dispatch(hideModal())}>
          {t('modals.cansel')}
        </Button>
        <Button variant="danger" onClick={removeChannel(props)}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
