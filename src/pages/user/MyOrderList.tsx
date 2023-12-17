import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";

// API
import { getMyOrders } from "api/";

const MyOrderList = () => {
  // API Call
  const { data, isFetching, isError, error }: any = useQuery({
    queryKey: ["get_my_orders"],
    queryFn: getMyOrders,
    refetchOnWindowFocus: false,
  });

  // Columns
  const columns = [
    {
      name: "Order ID",
      sortable: true,
      cell: (row: any) => <Link to={`/my-order/${row?._id}`}>{row?._id}</Link>,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row.customerName,
    },
    {
      name: "Amount (₹)",
      sortable: true,
      selector: (row: any) => row.totalAmount,
    },
    {
      name: "Order Items",
      sortable: true,
      selector: (row: any) => row.orderItems?.length,
    },
  ];

  return (
    <Container>
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "My Orders" },
        ]}
      />

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
