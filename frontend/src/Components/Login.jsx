import { useFormik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Form, Button, FloatingLabel, Card,
} from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';
import logo from './img/poster_event_1336266.jpg';

const PageLogin = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const auth = useAuth();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await axios.post('/api/v1/login', values)
        .catch((err) => {
          console.log(err);
          setAuthFailed(true);
        });
      if (response) {
        window.localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        setAuthFailed(false);
        console.log(auth.loggedIn);
        if (location.state) {
          navigate(location.state.from);
        }
        navigate('/');
      }
    },
  });
  return (
    <div className="container-fluid h-100 position-absolute">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8">
          <Card className="container shadow-sm" style={{ minWidth: '250px' }}>
            <Card.Body className="row justify-content-center">
              <Card.Img style={{ width: '400px' }} className="img-fluid align-self-center col-12 col-md-6" variant="top" src={logo} alt="chat" />
              <Form onSubmit={formik.handleSubmit} style={{ maxWidth: '40%' }} className="col-12 col-md-6 p-4">
                <h1 className="text-center mb-3">Войти</h1>
                <Form.Group>
                  <FloatingLabel controlId="username" label="Ваш ник" className="mb-3">
                    <Form.Control isInvalid={authFailed} onChange={formik.handleChange} value={formik.values.username} autoComplete="username" placeholder="Ваш ник" type="username" name="username" required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel className="mb-4" controlId="password" label="Пароль">
                    <Form.Control isInvalid={authFailed} onChange={formik.handleChange} value={formik.values.password} autoComplete="current-password" placeholder="Пароль" type="password" name="password" required />
                    <Form.Control.Feedback tooltip type="invalid"><small>Неверные имя пользователя или пароль</small></Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 btn" variant="outline-primary" type="submit">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="row p-4">
              <div className="text-content text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регестрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
