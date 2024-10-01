import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../services/slices/modalsSlice.js';
import { useRenameChannelMutation } from '../../services/api.js';

const Rename = (props) => {
  const { modalInfo } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notify } = props;
  const { item } = modalInfo;
  const { channels } = useSelector((state) => state.channelsReducer);
  const channelsNames = channels.map((channel) => channel.name);
  const inputRef = useRef();
  const [renameChannel, result] = useRenameChannelMutation();
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
      const { id } = modalInfo.item;
      const name = filter.clean(values.name);
      await renameChannel({ id, name })
        .unwrap()
        .then(() => {
          if (!result.isError && modalInfo) {
            notify(`${t('toasts.rename')}`, true)();
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
