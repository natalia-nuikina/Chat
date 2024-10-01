import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../services/slices/modalsSlice.js';
import { useDeleteChannelMutation } from '../../services/api.js';

const Remove = (props) => {
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notify } = props;
  const [deleteChannel] = useDeleteChannelMutation();

  const removeChannel = () => async () => {
    const { id } = modalInfo.item;
    await deleteChannel(id)
      .unwrap()
      .then(() => {
        notify(`${t('toasts.remove')}`, true)();
        dispatch(hideModal());
      })
      .catch((err) => {
        if (err.status === 'FETCH_ERROR') {
          notify(`${t('toasts.error')}`, true, true)();
        }
      });
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
