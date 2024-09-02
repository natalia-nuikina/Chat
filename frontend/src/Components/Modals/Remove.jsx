import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { getAuthHeader } from '../helpers';

const Remove = (props) => {
  const { onHide, connectState, setConnectState } = props;
  const removeChannel = ({ modalInfo }) => async () => {
    const { id } = modalInfo.item;
    setConnectState(true);
    await axios.delete(`/api/v1/channels/${id}`, { headers: getAuthHeader() });
    setConnectState(false);
    onHide();
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide} disabled={connectState}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={connectState} variant="secondary" type="reset" onClick={onHide}>
          Отмена
        </Button>
        <Button disabled={connectState} variant="danger" onClick={removeChannel(props)}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
