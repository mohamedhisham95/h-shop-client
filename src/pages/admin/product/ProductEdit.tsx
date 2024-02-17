import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import Loader from "components/common/Loader";

// API
import { updateProduct, getAllCategory, getProduct, imageUpload } from "api/";

// Utils
import { productEditPage } from "static-data/breadcrumbs-data";
import { toastNotification } from "utils/toast-notification";

const ProductEdit = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  // History
  const history = useHistory();

  // State
  const [formData, setFormData] = useState<any>({});
  const [inputError, setInputError] = useState<any>(null);
  const [image, setImage] = useState<any>("");
  const [imagePublicId, setImagePublicId] = useState<any>("");

  // API Call
  const {
    isFetching: isProductFetching,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: [
      "get_category_by_id",
      {
        id,
      },
    ],
    queryFn: getProduct,
    onSuccess: (data) => {
      setFormData(data);
      setImage(data?.image);
    },
  });

  const {
    data: categoryData,
    isFetching: isCategoryFetching,
    isError: isCategoryError,
    error: categoryError,
  }: any = useQuery({
    queryKey: ["get_all_category"],
    queryFn: getAllCategory,
  });

  // Image Upload Handler
  async function uploadImageHandler(e: any) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    await imageUpload(formData).then((res) => {
      const { status, message, image_url, image_public_id } = res;
      if (status === "success") {
        toastNotification("success", message);
        setImage(image_url);
        setImagePublicId(image_public_id);
      }
      if (status === "failed") {
        toastNotification("error", message);
      }
    });
  }

  // Mutation
  const updateMutation = useMutation({
    mutationFn: ({
      name,
      image,
      imagePublicId,
      brand,
      categoryId,
      description,
      price,
      countInStock,
    }: any) =>
      updateProduct([
        "update_product",
        {
          id,
          name,
          image,
          imagePublicId,
          brand,
          categoryId,
          description,
          price,
          countInStock,
        },
      ]),
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
          history.push("/admin/product/list");
        }, 1800);
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    enableReinitialize: true,
    initialValues: {
      name: formData?.name,
      brand: formData?.brand,
      categoryId: formData?.categoryId?._id,
      description: formData?.description,
      price: formData?.price,
      countInStock: formData?.countInStock,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      brand: Yup.string().required("Brand is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.string().required("Price is required"),
      countInStock: Yup.string().required("Count In Stock is required"),
    }),
    onSubmit: (values: any) => {
      setInputError({});
      updateMutation.mutate({
        name: values?.name,
        image: image,
        imagePublicId: imagePublicId,
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
      <BreadCrumbs list={productEditPage} />

      {isCategoryFetching && <Loader />}

      {isCategoryError && <Message message={categoryError?.message} />}

      {isProductError && <Message message={productError} />}

      {!isCategoryFetching &&
        !isCategoryError &&
        !isProductFetching &&
        !isProductError && (
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
                isInvalid={
                  form?.errors?.countInStock || inputError?.countInStock
                }
              />

              {form.touched.countInStock && form.errors.countInStock && (
                <Form.Control.Feedback type="invalid">
                  {form.errors.countInStock}
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

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={uploadImageHandler} />
              {image !== "" && (
                <>
                  <Form.Text className="text-muted my-2">Image Path:</Form.Text>
                  <Form.Text className="text-muted my-2 text-break">
                    <kbd>{`${image}`}</kbd>
                  </Form.Text>
                  <Form.Text className="text-muted my-2">
                    Image Preview:
                  </Form.Text>
                  <Image
                    src={`${image}`}
                    rounded
                    className="my-2"
                    style={{ width: "100%" }}
                  />
                </>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? (
                <Loader loaderSize="small" variant="light" />
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        )}

      {/* Toast */}
      <Toaster />
    </ContainerCenter>
  );
};

export default ProductEdit;
