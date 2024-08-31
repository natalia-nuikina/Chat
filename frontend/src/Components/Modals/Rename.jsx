import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getAuthHeader from '../helpers';

const generateOnSubmit = ({
  modalInfo, onHide, setConnectState,
}) => async (values, { resetForm }) => {
  const { id } = modalInfo.item;
  setConnectState(true);
  await axios.patch(`/api/v1/channels/${id}`, values, { headers: getAuthHeader() })
    .catch((err) => {
      console.log(err);
    });
  setConnectState(false);
  resetForm();
  onHide();
};

const Rename = (props) => {
  const { onHide, modalInfo, connectState } = props;
  const { item } = modalInfo;
  const { channels } = useSelector((state) => state.channelsReducer);
  const channelsNames = channels.map((channel) => channel.name);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: item.name,
    },
    validationSchema: yup.object({
      name: yup.string().required().min(3, 'Too Short!').max(20, 'Too Long!')
        .notOneOf(channelsNames, 'not one off'),
    }),
    onSubmit: generateOnSubmit(props),
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide} disabled={connectState}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Control
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputRef}
              name="name"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={connectState} variant="secondary" type="reset" onClick={onHide}>
            Отменить
          </Button>
          <Button disabled={connectState} variant="primary" type="submit">
            Отправить
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
