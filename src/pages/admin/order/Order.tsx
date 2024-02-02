import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import OrderDetail from "components/order/OrderDetail";

// API
import { getOrderById } from "api/";

// Utils
import { orderPage } from "utils/breadcrumbs";

const Order = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_order_id",
      {
        id: id,
      },
    ],
    queryFn: getOrderById,

    enabled: true,
  });

  return (
    <Container className="order">
      <BreadCrumbs list={orderPage} />

      <OrderDetail
        isLoading={isLoading}
        isError={isError}
        error={error?.message}
        data={data}
      />
    </Container>
  );
};

export default Order;
