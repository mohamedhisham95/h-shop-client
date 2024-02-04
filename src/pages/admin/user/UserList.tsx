import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

// Component
import CustomDataTable from "components/custom-data-table/CustomDataTable";
import BreadCrumbs from "components/common/BreadCrumbs";
import Message from "components/common/Message";

// API
import { getAllUsers } from "api/";

// Utils
import { userListPage } from "utils/breadcrumbs";
import { formatDate } from "utils/date-helpers";

const UserList = () => {
  // API Call
  const { data, isFetching, isError, error }: any = useQuery({
    queryKey: ["get_all_users"],
    queryFn: getAllUsers,
  });

  // Columns
  const columns = [
    {
      name: "Name",
      sortable: true,
      selector: (row: any) => row.name,
    },
    {
      name: "Role",
      sortable: true,
      selector: (row: any) => row.role,
    },
    {
      name: "Date",
      sortable: true,
      selector: (row: any) => formatDate(row.createdAt),
    },
  ];

  return (
    <Container>
      <BreadCrumbs list={userListPage} />

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
          globalSearchPlaceholder={"Search by name"}
          setSelectedRows={() => {}}
          isCreateAllowed={false}
          createLink=""
          isRowSelectAllowed={false}
        />
      </Row>
    </Container>
  );
};

export default UserList;
