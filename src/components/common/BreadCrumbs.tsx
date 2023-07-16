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
              <Breadcrumb.Item active as={Link} to={item.link} key={index}>
                {item.label}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>
            )
          )}
        </Breadcrumb>
      </Col>
    </Row>
  );
};

export default BreadCrumbs;
