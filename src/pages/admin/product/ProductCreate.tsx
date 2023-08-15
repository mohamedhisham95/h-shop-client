import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import Loader from "components/common/Loader";

// API
import { createProduct, getAllCategory } from "api/";

const ProductCreate = () => {
  // History
  const history = useHistory();

  // State
  const [inputError, setInputError] = useState<any>(null);
  const [createError, setCreateError] = useState<any>(null);

  // Query
  const {
    data: categoryData,
    isFetching: isCategoryFetching,
    isError: isCategoryError,
    error: categoryError,
  }: any = useQuery({
    queryKey: ["get_all_category"],
    queryFn: getAllCategory,
    refetchOnWindowFocus: false,
  });

  // Mutation
  const createMutation = useMutation({
    mutationFn: ({
      name,
      image,
      brand,
      categoryId,
      description,
      price,
      countInStock,
    }: any) =>
      createProduct([
        "create_product",
        { name, image, brand, categoryId, description, price, countInStock },
      ]),
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
        history.push("/admin/product/list");
      }
    },
  });

  // Formik
  const createForm: any = useFormik<any>({
    initialValues: {
      name: "",
      image: "",
      brand: "",
      categoryId: "",
      description: "",
      price: "",
      countInStock: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      image: Yup.string().required("Image is required"),
      brand: Yup.string().required("Brand is required"),
      categoryId: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.string().required("Price is required"),
      countInStock: Yup.string().required("Count In Stock is required"),
    }),
    onSubmit: (values: any) => {
      setCreateError(null);
      setInputError({});
      createMutation.mutate({
        name: values?.name,
        image: values?.image,
        brand: values?.brand,
        categoryId: values?.categoryId,
        description: values?.description,
        price: values?.price,
        countInStock: values?.countInStock,
      });
    },
  });

  return (
    <ContainerCenter>
      <Toaster position="top-right" reverseOrder={false} />

      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Product Create" },
        ]}
      />

      {isCategoryFetching && <Loader />}

      {isCategoryError && <Message message={categoryError?.message} />}

      {!isCategoryFetching && !isCategoryError && (
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

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              onChange={createForm.handleChange}
              onBlur={createForm.handleBlur}
              value={createForm.values.brand}
              isInvalid={createForm?.errors?.brand || inputError?.brand}
            />

            {createForm.touched.brand && createForm.errors.brand && (
              <Form.Control.Feedback type="invalid">
                {createForm.errors.brand}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="categoryId">
            <Form.Label>Select category</Form.Label>
            <Form.Control
              as="select"
              onChange={createForm.handleChange}
              value={createForm.values.categoryId}
              isInvalid={
                createForm?.errors?.categoryId || inputError?.categoryId
              }
            >
              {categoryData?.data?.map((item: any) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>

            {createForm.touched.categoryId && createForm.errors.categoryId && (
              <Form.Control.Feedback type="invalid">
                {createForm.errors.categoryId}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              onChange={createForm.handleChange}
              onBlur={createForm.handleBlur}
              value={createForm.values.price}
              isInvalid={createForm?.errors?.price || inputError?.price}
            />

            {createForm.touched.price && createForm.errors.price && (
              <Form.Control.Feedback type="invalid">
                {createForm.errors.price}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter count-in-stock"
              onChange={createForm.handleChange}
              onBlur={createForm.handleBlur}
              value={createForm.values.countInStock}
              isInvalid={
                createForm?.errors?.countInStock || inputError?.countInStock
              }
            />

            {createForm.touched.countInStock &&
              createForm.errors.countInStock && (
                <Form.Control.Feedback type="invalid">
                  {createForm.errors.countInStock}
                </Form.Control.Feedback>
              )}
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              onChange={createForm.handleChange}
              onBlur={createForm.handleBlur}
              value={createForm.values.image}
              isInvalid={createForm?.errors?.image || inputError?.image}
            />

            {createForm.touched.image && createForm.errors.image && (
              <Form.Control.Feedback type="invalid">
                {createForm.errors.image}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              onChange={createForm.handleChange}
              onBlur={createForm.handleBlur}
              value={createForm.values.description}
              isInvalid={
                createForm?.errors?.description || inputError?.description
              }
            />

            {createForm.touched.description &&
              createForm.errors.description && (
                <Form.Control.Feedback type="invalid">
                  {createForm.errors.description}
                </Form.Control.Feedback>
              )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={createMutation.isLoading}
          >
            {createMutation.isLoading ? (
              <Loader loaderSize="small" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      )}
    </ContainerCenter>
  );
};

export default ProductCreate;
