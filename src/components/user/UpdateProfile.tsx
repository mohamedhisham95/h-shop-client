import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

// Component
import Loader from "components/common/Loader";

// Redux
import { setToken, setUserDetail } from "redux/userSlice";

// API
import { updateProfile } from "api";

// Utils
import { toastNotification } from "utils/toast-notification";

const UpdateProfile = () => {
  // Dispatch
  const dispatch = useDispatch();

  // Redux
  const { user_detail } = useSelector((state: any) => state.user);

  const initialValues = {
    name: user_detail?.name,
  };

  // State
  const [inputError, setInputError] = useState<any>(null);

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ name }: any) => updateProfile(["update_profile", { name }]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      const { formInputError, message, token, user } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }

      if (message) {
        localStorage.setItem("h-shop-token", token);
        dispatch(setUserDetail(user));
        dispatch(setToken(token));
        toastNotification("success", message);
        // form.resetForm();
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values: any) => {
      mutation.mutate({
        name: values?.name,
      });
    },
  });

  return (
    <Card className="my-3 rounded">
      <Card.Header as="h5">Update Profile</Card.Header>
      <Card.Body>
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
            {(form?.errors?.name || inputError?.name) && (
              <Form.Control.Feedback type="invalid">
                {form.errors.name || inputError?.name}
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

export default UpdateProfile;
