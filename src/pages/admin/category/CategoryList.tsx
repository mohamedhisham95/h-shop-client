import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import ActionMenu from "components/custom-data-table/ActionMenu";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
import DeleteModal from "components/modal/DeleteModal";
// import Loader from "components/common/Loader";

// API
import { getAllCategory } from "api/";

const CategoryList = () => {
  // State
  const [rowId, setRowId] = useState<any>(null);
  const [action, setAction] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  // API Call
  const { data, isFetching, isError, error }: any = useQuery({
    queryKey: ["get_category"],
    queryFn: getAllCategory,
    refetchOnWindowFocus: false,
  });

  // Columns
  const columns = [
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row.name,
      cell: (row: any) => (
        <Link to={`/admin/category/edit/${row?._id}`}>{row?.name}</Link>
      ),
    },
    {
      cell: (row: any) => (
        <ActionMenu
          disabled={selectedRows.length ? true : false}
          rowId={row?._id}
          setRowId={setRowId}
          setAction={setAction}
        />
      ),
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

  // Delete Handler
  function handleDelete() {
    console.log("deleted");
    setAction(null);
    setRowId(null);
  }

  return (
    <Container>
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Admin - Category List" },
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
          globalSearchPlaceholder={"Search by category name"}
          setSelectedRows={setSelectedRows}
          isCreateAllowed={true}
          createLink="/admin/category/create"
        />

        {action === "delete" && (
          <DeleteModal
            show={action === "delete" ? true : false}
            setShow={() => setAction(null)}
            title="Delete Category"
            deleteCallback={handleDelete}
          />
        )}
      </Row>
    </Container>
  );
};

export default CategoryList;
