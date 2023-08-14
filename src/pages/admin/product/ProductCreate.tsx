import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import Loader from "components/common/Loader";

// API
import { createProduct } from "api/";

const ProductCreate = () => {
  // State
  const [inputError, setInputError] = useState<any>(null);
  const [createError, setCreateError] = useState<any>(null);

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
        // Redirect to Home Page
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
      email: Yup.string().required("Email is required"),
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
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Product Create" },
        ]}
      />

      <Row>
        <Col>Test</Col>
      </Row>
    </ContainerCenter>
  );
};

export default ProductCreate;
