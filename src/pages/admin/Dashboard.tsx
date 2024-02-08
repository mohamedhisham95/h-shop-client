import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import ProductChart from "components/dashboard/ProductChart";
import OrderChart from "components/dashboard/OrderChart";
import UserChart from "components/dashboard/UserChart";
import SalesChart from "components/dashboard/SalesChart";

// Utils
import { dashboardPage } from "static-data/breadcrumbs-data";

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

        <Col md={6} className="mb-2">
          <SalesChart />
        </Col>

        <Col md={6} className="mb-2">
          <OrderChart />
        </Col>

        <Col md={6} className="mb-2">
          <UserChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
