import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { updateCategory, getCategoryById } from "api/";

// Utils
import { categoryEditPage } from "static-data/breadcrumbs-data";
import { toastNotification } from "utils/toast-notification";

const CategoryEdit = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  // History
  const history = useHistory();

  // State
  const [name, setName] = useState<any>("");
  const [inputError, setInputError] = useState<any>(null);
  const [updateError, setUpdateError] = useState<any>(null);

  // Query
  useQuery({
    queryKey: [
      "get_category_by_id",
      {
        id,
      },
    ],
    queryFn: getCategoryById,
    onSuccess: (data) => {
      setName(data?.data?.name);
    },
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ name }: any) =>
      updateCategory(["update_category", { id, name }]),
    onError: (error: any) => {
      toastNotification("error", error.message);
      setUpdateError(error.message);
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
    enableReinitialize: true,
    initialValues: {
      name: name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values: any) => {
      setUpdateError(null);
      setInputError({});
      mutation.mutate({
        id: id,
        name: values?.name,
      });
    },
  });

  return (
    <ContainerCenter>
      <BreadCrumbs list={categoryEditPage} />

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

        <Button variant="primary" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Loader loaderSize="small" variant="light" />
          ) : (
            "Update"
          )}
        </Button>
      </Form>

      {updateError && (
        <Row>
          <Col md={12} lg={12}>
            <Message message={updateError} />
          </Col>
        </Row>
      )}

      {/* Toast */}
      <Toaster />
    </ContainerCenter>
  );
};

export default CategoryEdit;
