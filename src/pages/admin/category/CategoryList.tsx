import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import DeleteModal from "components/modal/DeleteModal";
import BulkDelete from "components/common/BulkDelete";

// API
import { getAllCategory, deleteCategory } from "api/";

// Utils
import { categoryListPage } from "static-data/breadcrumbs-data";
import { toastNotification } from "utils/toast-notification";

const CategoryList = () => {
  // History
  const history = useHistory();

  // State
  const [rowId, setRowId] = useState<any>(null);
  const [action, setAction] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [clearSelectedRows, setClearSelectedRows] = useState<any>(false);

  // Pre Disable Row
  const rowDisabledCriteria = (row: any) => row.name === "Other";

  // API Call
  const { data, isFetching, isError, error, refetch }: any = useQuery({
    queryKey: ["get_all_category"],
    queryFn: getAllCategory,
  });

  // Delete Mutation
  const mutation = useMutation({
    mutationFn: ({ categoryId }: any) =>
      deleteCategory(["delete_category", { categoryId }]),
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
      cell: (row: any) => (
        <div className="d-flex justify-content-between ">
          <Button
            size="sm"
            variant="primary"
            className="mr-1"
            disabled={selectedRows.length > 0}
            onClick={() => history.push(`/admin/category/edit/${row?._id}`)}
          >
            <BsPencilSquare />
          </Button>
          <Button
            size="sm"
            variant="danger"
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
      categoryId: [rowId],
    });
  }

  // Bulk Delete Handler
  function handleBulkDelete() {
    mutation.mutate({
      categoryId: selectedRows.map((item: any) => item?._id),
    });
  }

  return (
    <Container>
      <BreadCrumbs list={categoryListPage} />

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
          globalSearchPlaceholder={"Search by category name"}
          setSelectedRows={setSelectedRows}
          isCreateAllowed={true}
          createLink="/admin/category/create"
          clearSelectedRows={clearSelectedRows}
          selectableRowDisabled={rowDisabledCriteria}
        />

        {["delete", "bulk-delete"].includes(action) && (
          <DeleteModal
            show={["delete", "bulk-delete"].includes(action)}
            title="Delete Category"
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

export default CategoryList;
