import { Modal, Button } from "react-bootstrap";

type props = {
  show: boolean;
  setShow: any;
  title: string;
  deleteCallback: any;
};

const DeleteModal: React.FC<props> = ({
  show,
  setShow,
  title,
  deleteCallback,
}) => {
  function handleClose() {
    setShow(false);
  }

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want delete this record?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
