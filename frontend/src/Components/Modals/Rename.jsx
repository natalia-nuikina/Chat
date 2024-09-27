import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { getAuthHeader } from '../helpers';
import routes from '../../routes.js';
import { hideModal } from '../../slices/modalsSlice.js';

const Rename = (props) => {
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notify } = props;
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
      name: yup.string()
        .required(`${t('errors.validation.required')}`)
        .min(3, `${t('errors.validation.range')}`)
        .max(20, `${t('errors.validation.range')}`)
        .notOneOf(channelsNames, `${t('errors.validation.unique')}`),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { setConnectState } = props;
      const { id } = modalInfo.item;
      setConnectState(true);
      const filtedData = { name: filter.clean(values.name) };
      const response = await axios
        .patch(routes.channelPath(id), filtedData, { headers: getAuthHeader() })
        .catch((err) => {
          if (err.code === 'ERR_NETWORK') {
            notify(`${t('toasts.error')}`, true, true)();
          }
        });
      if (response && modalInfo) {
        notify(`${t('toasts.rename')}`, true)();
      }
      setConnectState(false);
      resetForm();
      dispatch(hideModal());
    },
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
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
            <Form.Label className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={() => dispatch(hideModal())}>
            {t('modals.cansel')}
          </Button>
          <Button variant="primary" type="submit">
            {t('modals.send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
