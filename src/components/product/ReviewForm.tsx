import { Form, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

// Components
import Loader from "components/common/Loader";

// API
import { addReview } from "api/";

// Utils
import { toastNotification } from "utils/toast-notification";

type props = {
  productId: any;
};

const ReviewForm: React.FC<props> = ({ productId }) => {
  // Query Client
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ rating, comment }: any) =>
      addReview(["add_review", { productId, rating, comment }]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      const { message } = response.data;
      toastNotification("success", message);
      queryClient.invalidateQueries({
        queryKey: ["get_reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["get_product"] });
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues: {
      rating: "",
      comment: "",
    },
    validationSchema: Yup.object({
      rating: Yup.string().required("Rating is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values: any) => {
      mutation.mutate({
        rating: parseInt(values?.rating),
        comment: values?.comment,
      });
    },
  });

  return (
    <>
      <h3 className="pb-2">Write a Review</h3>
      <Form onSubmit={form.handleSubmit}>
        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            onChange={form.handleChange}
            value={form.values.rating}
            isInvalid={form?.errors?.rating}
          >
            <option value="">Select...</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </Form.Control>
          {form.touched.rating && form.errors.rating && (
            <Form.Control.Feedback type="invalid">
              {form.errors.rating}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            onChange={form.handleChange}
            value={form.values.comment}
            isInvalid={form?.errors?.comment}
          ></Form.Control>
          {form.touched.comment && form.errors.comment && (
            <Form.Control.Feedback type="invalid">
              {form.errors.comment}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Loader loaderSize="small" variant="light" />
          ) : (
            "Submit Review"
          )}
        </Button>
      </Form>
    </>
  );
};

export default ReviewForm;
