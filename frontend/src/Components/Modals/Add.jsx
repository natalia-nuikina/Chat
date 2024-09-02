import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuthHeader } from '../helpers';

const Add = (props) => {
  const { t } = useTranslation();
  const { onHide, connectState, setConnectState } = props;
  const { channels } = useSelector((state) => state.channelsReducer);
  const channelsNames = channels.map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(`${t('errors.validation.required')}`).min(3, `${t('errors.validation.range')}`).max(20, `${t('errors.validation.range')}`)
        .notOneOf(channelsNames, `${t('errors.validation.unique')}`),
    }),
    onSubmit: async (values, { resetForm }) => {
      setConnectState(true);
      await axios.post('/api/v1/channels', values, { headers: getAuthHeader() })
        .catch((err) => {
          console.log(err);
        });
      setConnectState(false);
      resetForm();
      onHide();
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide} disabled={connectState}>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Control
              ref={inputRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden">{t('modals.channelName')}</Form.Label>
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
      </Form>
    </Modal>
  );
};

export default Add;
