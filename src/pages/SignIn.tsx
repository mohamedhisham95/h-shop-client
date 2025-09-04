import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Logo
import logo from 'assets/logo.png';

// Component
import ContainerCenter from 'components/layout/ContainerCenter';
import Loader from 'components/common/Loader';

// Redux
import { setToken, setUserDetail } from 'redux/userSlice';

// API
import { signin } from 'api';

// Utils
import { toastNotification } from 'utils/toast-notification';

const SignIn = () => {
  // Dispatch
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  // State
  const [inputError, setInputError] = useState<any>(null);

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ email, password }: any) =>
      signin(['signin', { email, password }]),
    onError: (error: any) => {
      toastNotification('error', error?.message);
    },
    onSuccess: (response: any) => {
      const { token, formInputError, user } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }
      if (token) {
        localStorage.setItem('h-shop-token', token);
        dispatch(setUserDetail(user));
        dispatch(setToken(token));
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues: {
      email: initialValues.email,
      password: initialValues.password,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values: any) => {
      // setLoginError(null);
      setInputError({});
      mutation.mutate({
        email: values?.email,
        password: values?.password,
      });
    },
  });

  return (
    <ContainerCenter>
      {/* Title */}
      <div className="d-flex flex-column align-items-center">
        <img className="mb-4" src={logo} alt="" width="50" height="50" />
        <h5>Please Signin</h5>
      </div>

      {/* Form */}
      <Form onSubmit={form.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.email}
            isInvalid={form?.errors?.email || inputError?.email}
          />

          {form.touched.email && form.errors.email && (
            <Form.Control.Feedback type="invalid">
              {form.errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.password}
            isInvalid={form?.errors?.password || inputError?.password}
          />
          {(form?.errors?.password || inputError?.password) && (
            <Form.Control.Feedback type="invalid">
              {form.errors.password || inputError?.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Loader loaderSize="small" variant="light" />
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>

      {/* Toast */}
      <Toaster />
    </ContainerCenter>
  );
};

export default SignIn;
