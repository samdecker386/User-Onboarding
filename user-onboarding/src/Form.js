import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ values, errors, touched, isSubmitting, isValid }) => {
    return (
        <Form>
            <div>
                {touched.name && errors.name && <span>{errors.name}</span>}
                <Field type='text' name='name' placeholder='name' />
            </div>
            <div>
            {touched.email && errors.email && <span>{errors.email}</span>}
                <Field type='text' name='email' placeholder='email' />
            </div>
            <div>
            {touched.password && errors.password && <span>{errors.password}</span>}
            <Field type='password' name='password' placeholder='password'/>
            </div>
            <div>
                <Field type='checkbox' name='tos' checked={values.tos} />
                {!values.tos ? <span>Terms of service.</span> : <span>Agreed.</span>}
            </div>
            <button type='submit' disabled={!values.tos || !isValid}>Submit</button>
        </Form>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Name is required.'),
        email: Yup.string()
            .email("Email is invalid.")
            .required('Email is required.'),
        password: Yup.string()
            .min(6, "Password needs at least six characters.")
            .required('Password is required.')

    }),
    handleSubmit(values) {
        console.log(values)
    }
})(UserForm);

export default FormikUserForm; 