import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAuthHeader } from '../helpers';

const generateOnSubmit = (props, n, tt) => async (values, { resetForm }) => {
  const { modalInfo, onHide, setConnectState } = props;
  const { id } = modalInfo.item;
  console.log(modalInfo);
  setConnectState(true);
  const response = await axios.patch(`/api/v1/channels/${id}`, values, { headers: getAuthHeader() })
    .catch((err) => {
      if (err.code === 'ERR_NETWORK') {
        n(`${tt('toasts.error')}`, true, true)();
      }
    });
  if (response && modalInfo) {
    n(`${tt('toasts.rename')}`, true)();
  }

  setConnectState(false);
  resetForm();
  onHide();
};

const Rename = (props) => {
  const { t } = useTranslation();
  const {
    onHide, modalInfo, connectState, notify,
  } = props;
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
      name: yup.string().required(`${t('errors.validation.required')}`).min(3, `${t('errors.validation.range')}`).max(20, `${t('errors.validation.range')}`)
        .notOneOf(channelsNames, `${t('errors.validation.unique')}`),
    }),
    onSubmit: generateOnSubmit(props, notify, t),
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide} disabled={connectState}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
            <Form.Label className="visually-hidden">{t('modals.chanelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={connectState} variant="secondary" type="reset" onClick={onHide}>
            {t('modals.cansel')}
          </Button>
          <Button disabled={connectState} variant="primary" type="submit">
            {t('modals.send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
