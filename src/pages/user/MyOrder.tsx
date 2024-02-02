import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import OrderDetail from "components/order/OrderDetail";

// API
import { getMyOrderById } from "api/";

// Utils
import { myOrderPage } from "utils/breadcrumbs";

const MyOrder = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_my_order_id",
      {
        id: id,
      },
    ],
    queryFn: getMyOrderById,

    enabled: true,
  });

  return (
    <Container className="order">
      <BreadCrumbs list={myOrderPage} />

      <OrderDetail
        isLoading={isLoading}
        isError={isError}
        error={error?.message}
        data={data}
      />
    </Container>
  );
};

export default MyOrder;
