import { Formik, Form } from 'formik';
import * as Yup from 'yup';


import { MySelect, MyTextInput } from './index';
import formJson from './custom-form.json';

console.log(formJson);

const initialValues = {};
const requiredFields = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;

  if ( !input.validations ) continue;

  let schema  = Yup.string();
  
  for ( const rule of input.validations) {
    if ( rule.type === 'required') {
      schema = schema.required('This field is required')
    }
    if (rule.type === 'minLength') {
      schema = schema.min(
        (rule).value || 2,
        `Min length ${(rule).value || 2} characters`
      );
    }
    if (rule.type === 'email') {
      schema = schema.email('Please enter a Valid Email');
    }
  }

  requiredFields[input.name] = schema;
  console.log('REQUIREDFIELS', requiredFields);
}


const validationSchema = Yup.object({ ...requiredFields });
console.log('VALIDATIONSCHEMA', validationSchema);


export function DynamicForm() {
  return (
    <div>
      <h1>Dynamic Form</h1>
      

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, name, placeholder, label, options }) => {
              if (type === 'input' || type === 'password' || type === 'email') {
                return (
                  <MyTextInput
                    key={name}
                    type={(type)}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                  />
                );
              } else if ( type === 'select' ) {
                return (
                  <MySelect
                    key={name}
                    type={(type)}
                    name={name}
                    label={label}
                  >
                    <option value="">Select an Option</option>
                    {
                      options?.map( ({ id, label }) => (
                        <option key={id} value={id}>{label}</option>
                      ))
                    }
                  </MySelect>
                );
              }

              throw new Error(`Type: ${type} not supported`);
            })}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DynamicForm;
