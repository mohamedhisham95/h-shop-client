import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import DeleteModal from "components/modal/DeleteModal";

// API
import { getAllProducts, deleteProduct } from "api/";

// Utils
import { productListPage } from "utils/breadcrumbs";

const ProductList = () => {
  // History
  const history = useHistory();

  // State
  const [rowId, setRowId] = useState<any>(null);
  const [action, setAction] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [deleteError, setDeleteError] = useState(null);

  // API Call
  const { data, isFetching, isError, error, refetch }: any = useQuery({
    queryKey: ["get_product"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: ({ productId }: any) =>
      deleteProduct(["delete_product", { productId }]),
    onError: (error: any) => {
      setDeleteError(error.message);
    },
    onSuccess: (response: any) => {
      toast.success(response.message);
      setAction(null);
      setRowId(null);
      refetch();
    },
  });

  // Columns
  const columns = [
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row.name,
    },
    {
      name: "Category",
      sortable: true,
      selector: (row: any) => row.categoryId?.name,
    },
    {
      name: "Price (₹)",
      sortable: true,
      selector: (row: any) => row.price,
    },
    {
      name: "Count In Stock",
      sortable: true,
      selector: (row: any) => row.countInStock,
    },
    {
      cell: (row: any) => (
        <div className="d-flex justify-content-between ">
          <Button
            size="sm"
            className="mr-1"
            disabled={selectedRows.length > 0}
            onClick={() => history.push(`/admin/product/edit/${row?._id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            disabled={selectedRows.length > 0}
            onClick={() => {
              setRowId(row?._id);
              setAction("delete");
            }}
          >
            Delete
          </Button>
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

  // Delete Handler
  function handleDelete() {
    mutation.mutate({
      productId: rowId,
    });
  }

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />

      <BreadCrumbs list={productListPage} />

      <Row>
        {isError && (
          <Col md={12} lg={12}>
            <Message message={error?.message} />
          </Col>
        )}

        {deleteError && (
          <Col md={12} lg={12}>
            <Message message={deleteError} />
          </Col>
        )}

        <CustomDataTable
          columns={columns}
          data={data?.data}
          globalFilterColumn={"name"}
          isLoading={isFetching}
          globalSearchPlaceholder={"Search by product name"}
          setSelectedRows={setSelectedRows}
          isCreateAllowed={true}
          createLink="/admin/product/create"
        />

        {action === "delete" && (
          <DeleteModal
            show={action === "delete" ? true : false}
            setShow={() => setAction(null)}
            title="Delete Product"
            deleteCallback={handleDelete}
          />
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
