import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { getAllProducts } from "api/";

const Products = () => {
  // API Call
  const { data, isFetching, isError, error }: any = useQuery({
    queryKey: ["get_product"],
    queryFn: getAllProducts,
  });

  // Columns
  const columns = [
    // {
    //   name: "id",
    //   selector: (row: any) => row._id,
    // },
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row.name,
      cell: (row: any) => (
        <Link to={`/admin/product/edit/${row?._id}`}>{row?.name}</Link>
      ),
    },
    {
      name: "Price",
      sortable: true,
      selector: (row: any) => row.price,
    },
    {
      name: "Count In Stock",
      sortable: true,
      selector: (row: any) => row.countInStock,
    },
  ];

  return (
    <Container className="">
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Products" },
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
          globalFilterColumn={"name"}
          isLoading={isFetching}
        />
      </Row>
    </Container>
  );
};

export default Products;
