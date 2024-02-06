import { Modal, Button } from "react-bootstrap";

type props = {
  show: boolean;
  title: string;
  deleteCallback: any;
  closeCallback: any;
  bulkDelete: boolean;
};

const DeleteModal: React.FC<props> = ({
  show,
  title,
  deleteCallback,
  closeCallback,
  bulkDelete,
}) => {
  return (
    <Modal
      centered
      show={show}
      onHide={closeCallback}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure, you want delete{" "}
        {bulkDelete ? "this item" : "selected item(s)"} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeCallback}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteCallback}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
