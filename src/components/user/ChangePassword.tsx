import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// Component
import Loader from "components/common/Loader";

// API
import { changePassword } from "api";

// Utils
import { toastNotification } from "utils/toast-notification";

const ChangePassword = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  // State
  const [inputError, setInputError] = useState<any>(null);

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ currentPassword, newPassword, confirmNewPassword }: any) =>
      changePassword([
        "change_password",
        { currentPassword, newPassword, confirmNewPassword },
      ]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      const { formInputError, message } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }

      if (message) {
        toastNotification("success", message);
        form.resetForm();
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues: {
      currentPassword: initialValues.currentPassword,
      newPassword: initialValues.newPassword,
      confirmNewPassword: initialValues.confirmNewPassword,
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string().required("New password is required"),
      confirmNewPassword: Yup.string()
        .required("Confirm new password is required")
        .oneOf(
          [Yup.ref("newPassword")],
          "New password & confirm password must match"
        ),
    }),
    onSubmit: (values: any) => {
      mutation.mutate({
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword,
        confirmNewPassword: values?.confirmNewPassword,
      });
    },
  });

  return (
    <Card className="my-3 rounded">
      <Card.Header as="h5">Change Password</Card.Header>
      <Card.Body>
        {/* Form */}
        <Form onSubmit={form.handleSubmit}>
          <Form.Group controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.currentPassword}
              isInvalid={
                form?.errors?.currentPassword || inputError?.currentPassword
              }
            />
            {(form?.errors?.currentPassword || inputError?.currentPassword) && (
              <Form.Control.Feedback type="invalid">
                {form.errors.currentPassword || inputError?.currentPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.newPassword}
              isInvalid={form?.errors?.newPassword || inputError?.newPassword}
            />
            {(form?.errors?.newPassword || inputError?.newPassword) && (
              <Form.Control.Feedback type="invalid">
                {form.errors.newPassword || inputError?.newPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="confirmNewPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm new password"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.confirmNewPassword}
              isInvalid={
                form?.errors?.confirmNewPassword ||
                inputError?.confirmNewPassword
              }
            />
            {(form?.errors?.confirmNewPassword ||
              inputError?.confirmNewPassword) && (
              <Form.Control.Feedback type="invalid">
                {form.errors.confirmNewPassword ||
                  inputError?.confirmNewPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <Loader loaderSize="small" variant="light" />
            ) : (
              "Update"
            )}
          </Button>
        </Form>
      </Card.Body>

      {/* Toast */}
      <Toaster />
    </Card>
  );
};

export default ChangePassword;
