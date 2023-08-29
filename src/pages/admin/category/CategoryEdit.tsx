import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";

// API
import { createCategory } from "api/";

const CategoryEdit = () => {
  // History
  const history = useHistory();

  // State
  const [inputError, setInputError] = useState<any>(null);
  const [createError, setCreateError] = useState<any>(null);

  // Mutation
  const createMutation = useMutation({
    mutationFn: ({ name }: any) =>
      createCategory(["create_category", { name }]),
    onError: (error: any) => {
      setCreateError(error.message);
    },
    onSuccess: (response: any) => {
      const { message, formInputError } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }
      if (message) {
        toast.success(message);
        history.push("/admin/category/list");
      }
    },
  });

  // Formik
  const createForm: any = useFormik<any>({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values: any) => {
      setCreateError(null);
      setInputError({});
      createMutation.mutate({
        name: values?.name,
      });
    },
  });

  return (
    <ContainerCenter>
      <Toaster position="top-right" reverseOrder={false} />

      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Category Create" },
        ]}
      />

      <Form onSubmit={createForm.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}
            value={createForm.values.name}
            isInvalid={createForm?.errors?.name || inputError?.name}
          />

          {createForm.touched.name && createForm.errors.name && (
            <Form.Control.Feedback type="invalid">
              {createForm.errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={createMutation.isLoading}
        >
          {createMutation.isLoading ? <Loader loaderSize="small" /> : "Submit"}
        </Button>
      </Form>
    </ContainerCenter>
  );
};

export default CategoryEdit;
