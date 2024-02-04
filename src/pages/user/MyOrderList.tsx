import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";

// API
import { getMyOrders } from "api/";

// Utils
import { myOrderListPage } from "static-data/breadcrumbs-data";
import { formatUnixDate } from "utils/date-helpers";

const MyOrderList = () => {
  // API Call
  const { data, isFetching, isError, error }: any = useQuery({
    queryKey: ["get_my_orders"],
    queryFn: getMyOrders,
  });

  // Columns
  const columns = [
    {
      name: "Order ID",
      sortable: true,
      cell: (row: any) => (
        <Link to={`/my-order/${row?._id}`} className="text-uppercase">
          {row?._id}
        </Link>
      ),
    },
    {
      name: "Order Date",
      sortable: true,
      selector: (row: any) => formatUnixDate(row?.paymentResponse.update_time),
    },
    {
      name: "Amount (₹)",
      sortable: true,
      selector: (row: any) => row.totalAmount,
    },
    {
      name: "Ordered Items",
      sortable: true,
      selector: (row: any) => row.orderItems?.length,
    },
    {
      name: "Shipped",
      sortable: true,
      cell: (row: any) =>
        row?.isShipped ? (
          <BsCheckCircle className="green-icon" />
        ) : (
          <BsXCircle className="red-icon" />
        ),
    },
    {
      name: "Delivered",
      sortable: true,
      cell: (row: any) =>
        row?.isDelivered ? (
          <BsCheckCircle className="green-icon" />
        ) : (
          <BsXCircle className="red-icon" />
        ),
    },
  ];

  return (
    <Container className="order-list">
      <BreadCrumbs list={myOrderListPage} />

      <Row>
        {isError && (
          <Col md={12} lg={12}>
            <Message message={error?.message} />
          </Col>
        )}

        <CustomDataTable
          columns={columns}
          data={data?.data}
          globalFilterColumn={"customerName"}
          isLoading={isFetching}
          globalSearchPlaceholder={"Search by customer name"}
          setSelectedRows={() => {}}
          isCreateAllowed={false}
          createLink=""
          isRowSelectAllowed={false}
        />
      </Row>
    </Container>
  );
};

export default MyOrderList;
