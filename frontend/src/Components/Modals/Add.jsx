import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../../services/slices/channelsSlice.js';
import { hideModal } from '../../services/slices/modalsSlice.js';
import { useAddChannelMutation } from '../../services/api.js';

const Add = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notify } = props;
  const { channels } = useSelector((state) => state.channelsReducer);
  const channelsNames = channels.map((channel) => channel.name);
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const [addChannel, result] = useAddChannelMutation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(`${t('errors.validation.required')}`)
        .min(3, `${t('errors.validation.range')}`)
        .max(20, `${t('errors.validation.range')}`)
        .notOneOf(channelsNames, `${t('errors.validation.unique')}`),
    }),
    onSubmit: async (values, { resetForm }) => {
      const filtedData = { name: filter.clean(values.name) };
      await addChannel(filtedData)
        .unwrap()
        .then((payload) => {
          if (!result.isError && modalInfo) {
            notify(`${t('toasts.add')}`, true)();
            dispatch(setActiveChannel(payload.id));
          }
          resetForm();
          dispatch(hideModal());
        })
        .catch((err) => {
          if (err.status === 'FETCH_ERROR') {
            notify(`${t('toasts.error')}`, true, true)();
          }
        });
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
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
          <Button variant="secondary" type="reset" onClick={() => dispatch(hideModal())}>
            {t('modals.cansel')}
          </Button>
          <Button variant="primary" type="submit">
            {t('modals.send')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Add;
