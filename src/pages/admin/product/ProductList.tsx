import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BsFillTrash3Fill } from "react-icons/bs";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import DeleteModal from "components/modal/DeleteModal";
import BulkDelete from "components/common/BulkDelete";

// API
import { getAllProducts, deleteProduct } from "api/";

// Utils
import { productListPage } from "static-data/breadcrumbs-data";
import { toastNotification } from "utils/toast-notification";

const ProductList = () => {
  // History
  const history = useHistory();

  // State
  const [rowId, setRowId] = useState<any>(null);
  const [action, setAction] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [clearSelectedRows, setClearSelectedRows] = useState<any>(false);

  // API Call
  const { data, isFetching, isError, error, refetch }: any = useQuery({
    queryKey: ["get_all_product"],
    queryFn: getAllProducts,
  });

  // Delete Mutation
  const mutation = useMutation({
    mutationFn: ({ productId }: any) =>
      deleteProduct(["delete_product", { productId }]),
    onError: (error: any) => {
      toastNotification("error", error?.message);
    },
    onSuccess: (response: any) => {
      toastNotification("success", response?.data?.message);
      setAction(null);
      setRowId(null);
      setSelectedRows([]);
      setClearSelectedRows(true);
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
            variant="outline-primary"
            className="mr-1"
            disabled={selectedRows.length > 0}
            onClick={() => history.push(`/admin/product/edit/${row?._id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            disabled={selectedRows.length > 0}
            onClick={() => {
              setRowId(row?._id);
              setAction("delete");
            }}
          >
            <BsFillTrash3Fill />
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
      productId: [rowId],
    });
  }

  // Bulk Delete Handler
  function handleBulkDelete() {
    mutation.mutate({
      productId: selectedRows.map((item: any) => item?._id),
    });
  }

  return (
    <Container>
      <BreadCrumbs list={productListPage} />

      <Row>
        {isError && (
          <Col md={12} lg={12}>
            <Message message={error?.message} />
          </Col>
        )}

        {selectedRows.length > 0 && (
          <Col md={12} lg={12}>
            <BulkDelete count={selectedRows.length} setAction={setAction} />
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
          clearSelectedRows={clearSelectedRows}
        />

        {["delete", "bulk-delete"].includes(action) && (
          <DeleteModal
            show={["delete", "bulk-delete"].includes(action)}
            title="Delete Product"
            bulkDelete={action === "delete"}
            deleteCallback={() =>
              action === "delete" ? handleDelete() : handleBulkDelete()
            }
            closeCallback={() => {
              setAction(null);
              setRowId(null);
            }}
          />
        )}
      </Row>

      {/* Toast */}
      <Toaster />
    </Container>
  );
};

export default ProductList;
