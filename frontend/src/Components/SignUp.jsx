import { useFormik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, FloatingLabel, Card,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import logo from './img/young-woman-waving-hand-talking-bubbles-vector.jpg';

const SignUp = () => {
  const { t } = useTranslation();
  const notify = () => toast.error(`${t('toasts.networkErr')}`);
  const [connectState, setConnectState] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(`${t('errors.validation.required')}`)
        .min(3, `${t('errors.validation.range')}`)
        .max(20, `${t('errors.validation.range')}`),
      password: yup.string()
        .required(`${t('errors.validation.required')}`)
        .min(6, `${t('errors.validation.minRange')}`),
      confirmPassword: yup.string()
        .required()
        .oneOf([yup.ref('password'), null], `${t('errors.validation.confirmPassword')}`),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      setConnectState(true);
      const response = await axios.post('/api/v1/signup', { username, password })
        .catch((err) => {
          if (err.status === 409) {
            formik.errors.username = ' ';
            formik.errors.password = ' ';
            formik.errors.confirmPassword = `${t('errors.wasFound')}`;
          } else {
            notify();
          }
        });
      setConnectState(false);
      if (response) {
        window.localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        navigate('/');
      }
    },
  });
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">{t('logo')}</a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
                <Card.Body className="row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <Card.Img
                      className="img-fluid align-self-center col-12 col-md-8"
                      style={{ maxHeight: '30vh', maxWidth: '28vh' }}
                      src={logo}
                      alt="Войти"
                    />
                  </div>
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('signUpForm.heading')}</h1>
                    <Form.Group>
                      <FloatingLabel controlId="username" label={t('signUpForm.username')} className="mb-3">
                        <Form.Control
                          isInvalid={formik.touched.username && formik.errors.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder="От 3 до 20 символов"
                          autoComplete="username"
                          name="username"
                          autoFocus
                          required
                        />
                        <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel className="mb-4" controlId="password" label={t('signUpForm.password')}>
                        <Form.Control
                          isInvalid={formik.touched.password && formik.errors.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          autoComplete="new-password"
                          placeholder="Не менее 6 символов"
                          type="password"
                          name="password"
                          required
                        />
                        <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel className="mb-4" controlId="confirmPassword" label={t('signUpForm.confirmPassword')}>
                        <Form.Control
                          isInvalid={
                            formik.touched.confirmPassword
                            && formik.values.confirmPassword && formik.errors.confirmPassword
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmPassword}
                          autoComplete="new-password"
                          placeholder="Пароли должны совпадать"
                          name="confirmPassword"
                          type="password"
                          required
                        />
                        <Form.Control.Feedback tooltip type="invalid">
                          {formik.errors.confirmPassword}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      disabled={connectState}
                      className="w-100 mb-3"
                      variant="outline-primary"
                      type="submit"
                    >
                      {t('signUpForm.signupBtn')}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
