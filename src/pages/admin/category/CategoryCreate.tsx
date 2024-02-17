import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";

// API
import { createCategory } from "api/";

// Utils
import { categoryCreatePage } from "static-data/breadcrumbs-data";
import { toastNotification } from "utils/toast-notification";

const ProductCreate = () => {
  // History
  const history = useHistory();

  // State
  const [inputError, setInputError] = useState<any>(null);

  // Mutation
  const createMutation = useMutation({
    mutationFn: ({ name }: any) =>
      createCategory(["create_category", { name }]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      const { message, formInputError } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }
      if (message) {
        toastNotification("success", message, 1500);
        setTimeout(() => {
          history.push("/admin/category/list");
        }, 1800);
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values: any) => {
      setInputError({});
      createMutation.mutate({
        name: values?.name,
      });
    },
  });

  return (
    <ContainerCenter>
      <BreadCrumbs list={categoryCreatePage} />

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

        <Button
          variant="primary"
          type="submit"
          disabled={createMutation.isLoading}
        >
          {createMutation.isLoading ? (
            <Loader loaderSize="small" variant="light" />
          ) : (
            "Create"
          )}
        </Button>
      </Form>

      {/* Toast */}
      <Toaster />
    </ContainerCenter>
  );
};

export default ProductCreate;
