import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  useQuery,
  //  useMutation
} from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";
// import DeleteModal from "components/modal/DeleteModal";

// API
import { getAllCategory } from "api/";

// Utils
import { categoryListPage } from "utils/breadcrumbs";

const CategoryList = () => {
  // History
  const history = useHistory();

  // State
  // const [rowId, setRowId] = useState<any>(null);
  // const [action, setAction] = useState<any>(null);
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
    },
    {
      cell: (row: any) => (
        <div className="d-flex justify-content-between ">
          <Button
            size="sm"
            className="mr-1"
            disabled={selectedRows.length > 0}
            onClick={() => history.push(`/admin/category/edit/${row?._id}`)}
          >
            Edit
          </Button>
          {/* <Button
            size="sm"
            disabled={selectedRows.length > 0}
            onClick={() => {
              setRowId(row?._id);
              setAction("delete");
            }}
          >
            Delete
          </Button> */}
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

  // Delete Handler
  // function handleDelete() {
  //   console.log("deleted");
  //   // pass rowId here
  //   setAction(null);
  //   setRowId(null);
  // }

  return (
    <Container>
      <BreadCrumbs list={categoryListPage} />

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

        {/* {action === "delete" && (
          <DeleteModal
            show={action === "delete" ? true : false}
            setShow={() => setAction(null)}
            title="Delete Category"
            deleteCallback={handleDelete}
          />
        )} */}
      </Row>
    </Container>
  );
};

export default CategoryList;
