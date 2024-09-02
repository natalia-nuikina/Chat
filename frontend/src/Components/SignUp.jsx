import { useFormik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, FloatingLabel, Card,
} from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';
import logo from './img/young-woman-waving-hand-talking-bubbles-vector.jpg';

const SignUp = () => {
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
      username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
      password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
      confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      setConnectState(true);
      const response = await axios.post('/api/v1/signup', { username, password })
        .catch(() => {
          formik.errors.username = ' ';
          formik.errors.password = ' ';
          formik.errors.confirmPassword = 'Такой пользователь уже существует';
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
            <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
                <Card.Body className="row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <Card.Img className="img-fluid align-self-center col-12 col-md-8" style={{ maxHeight: '30vh', maxWidth: '28vh' }} src={logo} alt="Войти" />
                  </div>
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group>
                      <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
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
                      <FloatingLabel className="mb-4" controlId="password" label="Пароль">
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
                      <FloatingLabel className="mb-4" controlId="confirmPassword" label="Подтвердите пароль">
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
                        <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Button disabled={connectState} className="w-100 mb-3" variant="outline-primary" type="submit">Зарегистрироваться</Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
