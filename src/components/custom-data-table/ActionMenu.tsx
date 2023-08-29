import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

type props = {
  disabled: boolean;
  rowId: any;
  setRowId: any;
  setAction: any;
};

const ActionMenu: React.FC<props> = ({
  disabled,
  rowId,
  setRowId,
  setAction,
}) => {
  // History
  const history = useHistory();

  return (
    <div className="d-flex justify-content-between ">
      <Button
        size="sm"
        className="mr-1"
        disabled={disabled}
        onClick={() => history.push(`/admin/category/edit/${rowId}`)}
      >
        Edit
      </Button>
      <Button
        size="sm"
        disabled={disabled}
        onClick={() => {
          setRowId(rowId);
          setAction("delete");
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionMenu;
