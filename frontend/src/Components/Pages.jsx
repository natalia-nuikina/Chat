import { loremIpsum } from 'lorem-ipsum';
import { Formik, Form, Field } from 'formik';

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
export const PageLogin = () => (
  <Formik
    initialValues={{ name: '', password: '' }}
    onSubmit={({ setSubmitting }) => {
      console.log('Form is validated! Submitting the form...');
      setSubmitting(false);
    }}
  >
    <Form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <Field
          type="name"
          name="name"
          id="name"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field
          type="password"
          name="password"
          className="form-control"
        />
      </div>
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);
export const Page404 = () => (
  <>
    <h1>
      404 page not found
    </h1>
    <h3>
      Такой страници нет на нашем сайте.
      Возможно вы ввели не верный адресс или она была удалена. Попробуйте вернуться на главную.
    </h3>
  </>
);
