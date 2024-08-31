import axios from 'axios';
import {
  Button, Modal,
} from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import getAuthHeader from './helpers';

const ModalRemove = ({ props }) => {
  console.log(props);
  const { showRemove, handleCloseRemove, removeChannelId } = props;
  // const { channels } = useSelector((state) => state.channelsReducer);
  // const channelsNames = channels.map((channel) => channel.name);
  const removeChannel = (id) => async () => {
    await axios.delete(`/api/v1/channels/${id}`, { headers: getAuthHeader() });
    console.log(id);
    handleCloseRemove();
  };
  return (
    <Modal show={showRemove} onHide={handleCloseRemove} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={handleCloseRemove}>
          Отмена
        </Button>
        <Button variant="danger" onClick={removeChannel(removeChannelId)}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemove;
