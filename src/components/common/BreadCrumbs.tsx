import { Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

type props = {
  list: any;
};

const BreadCrumbs: React.FC<props> = ({ list }) => {
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb>
          {list.map((item: any, index: number, row: any) =>
            index + 1 !== row.length ? (
              <Breadcrumb.Item>
                <Link to={item.link}>{item.label}</Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item active>{item.label}</Breadcrumb.Item>
            )
          )}
        </Breadcrumb>
      </Col>
    </Row>
  );
};

export default BreadCrumbs;
