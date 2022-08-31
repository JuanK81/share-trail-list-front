import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput, MySelect, MyCheckbox } from '../components/form-components';

import '../styles/styles.css';

export const FormikAbstraction = () => {
  return (
    <div>
      <h1>Formik Abstraction</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less.')
            .required('Required field'),
          lastName: Yup.string()
            .max(15, 'Must be 15 characters or less.')
            .required('Required field'),
          email: Yup.string()
            .email('Please, enter a valid email')
            .required('Required'),
          terms: Yup.boolean().oneOf(
            [true],
            'You must accetp the terms ando isConditionalExpression.'
          ),
          jobType: Yup.string()
            .notOneOf(['it-senior', 'This option is not available'])
            .required('Required'),
        })}
      >
        {(formik) => (
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              placeholder="Enter Name"
            />
            <MyTextInput
              label="Last Name"
              name="lastName"
              placeholder="Enter Last Name"
            />
            <MyTextInput
              label="Email Address"
              name="email"
              placeholder="Enter Email"
              type="email"
            />

            <MySelect name="jobType" label="jobType">
              <option value="">pick something</option>
              <option value="developer">Developer</option>
              <option value="designer">designer</option>
              <option value="it-senior">It Senior</option>
            </MySelect>

            <MyCheckbox label="Terms & Conditions" name="terms" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikAbstraction;
