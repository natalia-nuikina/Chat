import { useFormik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Form, Button, FloatingLabel, Card,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import logo from './img/poster_event_1336266.jpg';

const PageLogin = () => {
  const { t } = useTranslation();
  const [connectState, setConnectState] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();
  const notify = () => toast.error(`${t('toasts.networkErr')}`);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setConnectState(true);
      const response = await axios.post('/api/v1/login', values)
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
            setAuthFailed(true);
          } else {
            notify();
          }
        });
      setConnectState(false);
      if (response) {
        window.localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        setAuthFailed(false);
        if (location.state) {
          navigate(location.state.from);
        }
        navigate('/');
      }
    },
  });
  return (
    <div className="h-100" id="login">
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
                    <Card.Img className="img-fluid align-self-center col-12 col-md-8" style={{ maxHeight: '30vh', maxWidth: '50vh' }} src={logo} alt="Войти" />
                  </div>
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('loginForm.login')}</h1>
                    <Form.Group>
                      <FloatingLabel controlId="username" label={t('loginForm.username')} className="mb-3">
                        <Form.Control isInvalid={authFailed} onChange={formik.handleChange} value={formik.values.username} autoComplete="username" placeholder="Ваш ник" type="username" name="username" required autoFocus />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel className="mb-4" controlId="password" label={t('loginForm.password')}>
                        <Form.Control isInvalid={authFailed} onChange={formik.handleChange} value={formik.values.password} autoComplete="current-password" placeholder="Пароль" type="password" name="password" required />
                        <Form.Control.Feedback tooltip type="invalid"><small>{t('errors.validation.notFound')}</small></Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Button disabled={connectState} className="w-100 mb-3" variant="outline-primary" type="submit">{t('loginForm.login')}</Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="p-4">
                  <div className="text-center">
                    <span>{t('loginForm.futter')}</span>
                    <a href="/signup">{t('loginForm.signUp')}</a>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PageLogin;
