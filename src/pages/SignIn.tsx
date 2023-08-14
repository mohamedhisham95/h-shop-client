import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

// Logo
import logo from "assets/logo.png";

// Components
import ContainerCenter from "components/layout/ContainerCenter";
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// Redux
import { setToken, setUserDetail } from "redux/userSlice";

// API
import { signin } from "api";

const SignIn = () => {
  // Dispatch
  const dispatch = useDispatch();

  const initialValues = {
    email: "hmhwebdev@gmail.com",
    password: "123456",
  };

  // State
  const [inputError, setInputError] = useState<any>(null);
  const [loginError, setLoginError] = useState<any>(null);

  // Mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: any) =>
      signin(["signin", { email, password }]),
    onError: (error: any) => {
      setLoginError(error.message);
    },
    onSuccess: (response: any) => {
      const { token, formInputError, user } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }
      if (token) {
        localStorage.setItem("h-shop-token", token);
        dispatch(setUserDetail(user));
        dispatch(setToken(token));
      }
    },
  });

  // Formik
  const loginForm: any = useFormik<any>({
    initialValues: {
      email: initialValues.email,
      password: initialValues.password,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values: any) => {
      setLoginError(null);
      setInputError({});
      loginMutation.mutate({
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
      <Form onSubmit={loginForm.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
            isInvalid={loginForm?.errors?.email || inputError?.email}
          />

          {loginForm.touched.email && loginForm.errors.email && (
            <Form.Control.Feedback type="invalid">
              {loginForm.errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
            isInvalid={loginForm?.errors?.password || inputError?.password}
          />
          {(loginForm?.errors?.password || inputError?.password) && (
            <Form.Control.Feedback type="invalid">
              {loginForm.errors.password || inputError?.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? <Loader loaderSize="small" /> : "Submit"}
        </Button>
      </Form>

      {/* Error Message */}
      {loginError !== null && <Message message={loginError} className="mt-2" />}
    </ContainerCenter>
  );
};

export default SignIn;
