import { ListGroup, Form } from "react-bootstrap";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

// Component
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Rating from "components/product/Rating";

// API
import { getReviews, deleteReview } from "api/";

// Utils
import { toastNotification } from "utils/toast-notification";

// Static Data
import { reviewSortDropdown } from "static-data/dropdown-data";

const ReviewList = () => {
  // Query Client
  const queryClient = useQueryClient();

  // Params
  const { id } = useParams<{ id: string }>();

  // Redux
  const { user_detail } = useSelector((state: any) => state.user);

  // State
  const [sortBy, setSortBy] = useState("desc-createdAt");

  // Query
  const { data, isFetched, isError, error }: any = useQuery({
    queryKey: [
      "get_reviews",
      {
        productId: id,
      },
    ],
    queryFn: getReviews,
  });

  // Mutation
  const createMutation = useMutation({
    mutationFn: ({ reviewId, productId }: any) =>
      deleteReview(["delete_review", { reviewId, productId }]),
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

  // Delete Review
  function handleDeleteReview(reviewId: any, productId: any) {
    createMutation.mutate({
      reviewId,
      productId,
    });
  }

  // Sort Function
  function sortFunction(
    data: any,
    objName: any,
    isDate: boolean,
    sortType: any
  ) {
    if (sortType === "asc") {
      return data?.sort((a: any, b: any) =>
        isDate ? a[objName].localeCompare(b[objName]) : a[objName] - b[objName]
      );
    } else {
      return data?.sort((a: any, b: any) =>
        isDate ? b[objName].localeCompare(a[objName]) : b[objName] - a[objName]
      );
    }
  }

  // Review List Data
  const reviewData = useMemo(() => {
    return sortFunction(
      data?.data,
      sortBy.split("-")[1],
      sortBy.split("-")[1] === "createdAt",
      sortBy.split("-")[0]
    );
  }, [data, sortBy]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="pb-2">Reviews</h3>
        <Form.Group controlId="days">
          <Form.Control
            as="select"
            size="sm"
            value={sortBy}
            onChange={(e: any) => {
              setSortBy(e.target.value);
            }}
          >
            {reviewSortDropdown?.map((item: any, key: number) => (
              <option key={key} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      {!isFetched && <Loader />}

      {isFetched && reviewData?.length === 0 && (
        <Message variant="info" message={"No Reviews"} />
      )}

      {isError && <Message message={error?.message} />}

      {isFetched && (
        <ListGroup className="review-list">
          {reviewData?.map((review: any) => {
            return (
              <ListGroup.Item key={review._id}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{review.userId?.name}</h5>
                  <small className="text-muted">
                    <Rating value={review.rating} showCount={false} />
                  </small>
                </div>

                <div className="d-flex w-100 justify-content-between align-items-center">
                  <div>
                    <p className="mb-1">{review.comment}</p>
                    <small className="text-muted">
                      {dayjs(review.createdAt).format(
                        "ddd, MMM DD YYYY hh:mm:ss A"
                      )}
                    </small>
                  </div>

                  {user_detail !== null &&
                    review.userId?._id === user_detail.id && (
                      <div
                        className="text-danger cursor-pointer"
                        onClick={() =>
                          handleDeleteReview(review?._id, review?.productId)
                        }
                      >
                        <BsFillTrash3Fill />
                      </div>
                    )}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
};

export default ReviewList;
