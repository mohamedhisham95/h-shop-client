import { Alert, Button } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";

type props = {
  variant?: string;
  count: any;
  setAction: any;
};

const BulkDelete: React.FC<props> = ({
  variant = "info",
  count,
  setAction,
}) => {
  return (
    <Alert
      variant={variant}
      className="d-flex justify-content-between align-items-center"
    >
      <div>
        {count} {count > 1 ? "items" : "item"} selected
      </div>
      <Button
        size="sm"
        variant="danger"
        onClick={() => {
          setAction("bulk-delete");
        }}
      >
        <BsFillTrash3Fill />
      </Button>
    </Alert>
  );
};

export default BulkDelete;
