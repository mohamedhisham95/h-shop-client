import { Modal, Button } from "react-bootstrap";

type props = {
  show: boolean;
  setShow: any;
  title: string;
  editCallback: any;
};

const FormModal: React.FC<props> = ({ show, setShow, title, editCallback }) => {
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
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={editCallback}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
