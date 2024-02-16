import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

// Logo
import logo from "assets/logo.png";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import Loader from "components/common/Loader";

// Redux
import { setToken, setUserDetail } from "redux/userSlice";

// API
import { signup } from "api";

// Utils
import { toastNotification } from "utils/toast-notification";

const SignUp = () => {
  // Dispatch
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // State
  const [inputError, setInputError] = useState<any>(null);

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ name, email, password, confirmPassword }: any) =>
      signup(["signup", { name, email, password, confirmPassword }]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      const { token, formInputError, user, message } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }
      if (token) {
        toastNotification("success", message, 1500);

        setTimeout(() => {
          localStorage.setItem("h-shop-token", token);
          dispatch(setUserDetail(user));
          dispatch(setToken(token));
        }, 1800);
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues: {
      name: initialValues.name,
      email: initialValues.email,
      password: initialValues.password,
      confirmPassword: initialValues.confirmPassword,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Password & confirm password must match"),
    }),
    onSubmit: (values: any) => {
      setInputError({});
      mutation.mutate({
        name: values?.name,
        email: values?.email,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
      });
    },
  });

  return (
    <ContainerCenter>
      {/* Title */}
      <div className="d-flex flex-column align-items-center">
        <img className="mb-4" src={logo} alt="" width="50" height="50" />
        <h5>Welcome, Please signup</h5>
      </div>

      {/* Form */}
      <Form onSubmit={form.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
            isInvalid={form?.errors?.name || inputError?.name}
          />

          {form.touched.name && form.errors.name && (
            <Form.Control.Feedback type="invalid">
              {form.errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.confirmPassword}
            isInvalid={
              form?.errors?.confirmPassword || inputError?.confirmPassword
            }
          />
          {(form?.errors?.confirmPassword || inputError?.confirmPassword) && (
            <Form.Control.Feedback type="invalid">
              {form.errors.confirmPassword || inputError?.confirmPassword}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Loader loaderSize="small" variant="light" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>

      {/* Toast */}
      <Toaster />
    </ContainerCenter>
  );
};

export default SignUp;
