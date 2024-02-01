import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import ProductChart from "components/dashboard/ProductChart";

// Utils
import { dashboardPage } from "utils/breadcrumbs";

const Dashboard = () => {
  // Redux
  const { user_detail } = useSelector((state: any) => state.user);

  return (
    <Container>
      <BreadCrumbs list={dashboardPage} />

      <Row>
        <Col md={12} className="mt-2 mb-2">
          <h2>Welcome, {user_detail?.name}</h2>
        </Col>

        <Col md={6} className="mb-2">
          <ProductChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
