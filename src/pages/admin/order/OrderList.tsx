// import { useState } from "react";
import {
  Container,
  Row,
  Col,
  // Button
} from "react-bootstrap";
import {
  useQuery,
  // useMutation
} from "@tanstack/react-query";
import {
  // useHistory,
  Link,
} from "react-router-dom";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";

// API
import { getAllOrders } from "api/";

const OrderList = () => {
  // History
  // const history = useHistory();

  // API Call
  const { data, isFetching, isError, error }: any = useQuery({
    queryKey: ["get_all_orders"],
    queryFn: getAllOrders,
    refetchOnWindowFocus: false,
  });

  // Columns
  const columns = [
    {
      name: "Order ID",
      sortable: true,
      cell: (row: any) => (
        <Link to={`/admin/order/${row?._id}`} className="text-uppercase">
          {row?._id}
        </Link>
      ),
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
      name: "Ordered Item(s)",
      sortable: true,
      selector: (row: any) => row.orderItems?.length,
    },
    // {
    //   cell: (row: any) => (
    //     <div className="d-flex justify-content-between ">
    //       <Button
    //         size="sm"
    //         className="mr-1"
    //         disabled={selectedRows.length > 0}
    //         onClick={() => history.push(`/admin/product/edit/${row?._id}`)}
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         size="sm"
    //         disabled={selectedRows.length > 0}
    //         onClick={() => {
    //           setRowId(row?._id);
    //           setAction("delete");
    //         }}
    //       >
    //         Delete
    //       </Button>
    //     </div>
    //   ),
    //   allowOverflow: true,
    //   button: true,
    //   width: "120px",
    // },
  ];

  return (
    <Container>
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Order List" },
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

export default OrderList;
