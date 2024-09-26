import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthHeader } from '../helpers';
import routes from '../../routes.js';
import { hideModal } from '../../slices/modalsSlice.js';

const Remove = (props) => {
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { connectState, notify } = props;
  const removeChannel = () => async () => {
    const { id } = modalInfo.item;
    const response = await axios.delete(routes.channelPath(id), { headers: getAuthHeader() })
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
      <Modal.Header closeButton onHide={() => dispatch(hideModal())} disabled={connectState}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.sure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={connectState} variant="secondary" type="reset" onClick={() => dispatch(hideModal())}>
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
