import { ListGroup, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Utils
import { formatDateAndTime } from "utils/date-helpers";
import { toastNotification } from "utils/toast-notification";

// API
import { updateOrderStatus } from "api";

type props = {
  data: any;
};

const OrderTrackingUpdate: React.FC<props> = ({ data }) => {
  // Query Client
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation({
    mutationFn: ({ orderId, type, value }: any) =>
      updateOrderStatus(["update_order_status", { orderId, type, value }]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["get_order_by_id"] });
      queryClient.invalidateQueries({ queryKey: ["get_my_order_id"] });
      toastNotification("success", response?.message);
    },
  });

  function handleStatusUpdate(type: any, value: any) {
    mutation.mutate({
      orderId: data?._id,
      type,
      value,
    });
  }

  return (
    <>
      <ListGroup.Item>
        <h3 className="mb-3">Tracking Details</h3>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>
              <p>Shipping :</p>
              {data?.isShipped ? (
                <p className="text-success">
                  Shipped at {formatDateAndTime(data?.shippedAt)}
                </p>
              ) : (
                <p className="text-info">Preparing for shipping...</p>
              )}
            </div>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handleStatusUpdate("isShipped", !data?.isShipped)}
            >
              {data?.isShipped ? "Unmark as shipped" : "Mark as shipped"}
            </Button>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>
              <p>Delivery :</p>
              {data?.isDelivered ? (
                <p className="text-success">
                  Delivered at {formatDateAndTime(data?.deliveredAt)}
                </p>
              ) : data?.isShipped ? (
                <p className="text-info">Preparing for Delivery</p>
              ) : (
                <p className="text-info">
                  Status will be updated after shipping
                </p>
              )}
            </div>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                handleStatusUpdate("isDelivered", !data?.isDelivered)
              }
            >
              {data?.isDelivered ? "Unmark as delivered" : "Mark as delivered"}
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>

      {/* Toast */}
      <Toaster />
    </>
  );
};

export default OrderTrackingUpdate;
