import { loremIpsum } from 'lorem-ipsum';
// import { Formik } from 'formik';
// import {
//   Form, Button, FloatingLabel, Card,
// } from 'react-bootstrap';

// import error from './img/Снимок экрана 2024-08-16 в 17.04.00.png';

const BuildPage = (index) => (
  <>
    <h3>
      Page
      { index }
    </h3>
    <div>
      Page
      {index}
      content:
      { loremIpsum({ count: 5 })}
    </div>
  </>
);

export const PageOne = () => BuildPage(1);
export const Page404 = () => (
  <>
    <h1>
      404 page not found
    </h1>
    <h3>
      Такой страници нет на нашем сайте.
      Возможно вы ввели не верный адресс или она была удалена. Но вы можете вернуться на главную.
    </h3>
  </>
);
