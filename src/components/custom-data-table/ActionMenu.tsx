import { Button } from "react-bootstrap";

type props = {
  disabled: boolean;
  setRowId: any;
  setAction: any;
};

const ActionMenu: React.FC<props> = ({ disabled, setRowId, setAction }) => {
  return (
    <div className="d-flex justify-content-between ">
      <Button
        size="sm"
        className="mr-1"
        disabled={disabled}
        onClick={() => setAction("edit")}
      >
        Edit
      </Button>
      <Button size="sm" disabled={disabled} onClick={() => setAction("delete")}>
        Delete
      </Button>
    </div>
  );
};

export default ActionMenu;
