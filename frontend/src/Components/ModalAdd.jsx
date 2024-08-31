import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getAuthHeader from './helpers';

const ModalAdd = ({ props }) => {
  const { showAdd, handleCloseAdd } = props;
  const { channels } = useSelector((state) => state.channelsReducer);
  const channelsNames = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().min(3, 'Too Short!').max(20, 'Too Long!')
        .notOneOf(channelsNames, 'not one off'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await axios.post('/api/v1/channels', values, { headers: getAuthHeader() })
        .catch((err) => {
          console.log(err);
        });
      resetForm();
      handleCloseAdd();
    },
  });

  return (
    <Modal show={showAdd} onHide={handleCloseAdd} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Control
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              autoFocus
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleCloseAdd}>
            Отменить
          </Button>
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
