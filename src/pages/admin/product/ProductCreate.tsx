import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

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

  // API Call
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
  const mutation = useMutation({
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
        history.push("/admin/product/list");
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
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
      mutation.mutate({
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
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Product Create" },
        ]}
      />

      {isCategoryFetching && <Loader />}

      {isCategoryError && <Message message={categoryError?.message} />}

      {createError && <Message message={createError} />}

      {!isCategoryFetching && !isCategoryError && (
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

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.brand}
              isInvalid={form?.errors?.brand || inputError?.brand}
            />

            {form.touched.brand && form.errors.brand && (
              <Form.Control.Feedback type="invalid">
                {form.errors.brand}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="categoryId">
            <Form.Label>Select category</Form.Label>
            <Form.Control
              as="select"
              onChange={form.handleChange}
              value={form.values.categoryId}
              isInvalid={form?.errors?.categoryId || inputError?.categoryId}
            >
              {categoryData?.data?.map((item: any) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>

            {form.touched.categoryId && form.errors.categoryId && (
              <Form.Control.Feedback type="invalid">
                {form.errors.categoryId}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.price}
              isInvalid={form?.errors?.price || inputError?.price}
            />

            {form.touched.price && form.errors.price && (
              <Form.Control.Feedback type="invalid">
                {form.errors.price}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter count-in-stock"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.countInStock}
              isInvalid={form?.errors?.countInStock || inputError?.countInStock}
            />

            {form.touched.countInStock && form.errors.countInStock && (
              <Form.Control.Feedback type="invalid">
                {form.errors.countInStock}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.image}
              isInvalid={form?.errors?.image || inputError?.image}
            />

            {form.touched.image && form.errors.image && (
              <Form.Control.Feedback type="invalid">
                {form.errors.image}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.description}
              isInvalid={form?.errors?.description || inputError?.description}
            />

            {form.touched.description && form.errors.description && (
              <Form.Control.Feedback type="invalid">
                {form.errors.description}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? <Loader loaderSize="small" /> : "Submit"}
          </Button>
        </Form>
      )}
    </ContainerCenter>
  );
};

export default ProductCreate;
