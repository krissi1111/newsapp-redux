import { Alert, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal } from "../../redux/slices/errorSlice";



export function ErrorModal(props) {
  const dispatch = useDispatch()
  const errorValues = useSelector((state) => state.error)

  let { showModal, errorMessage } = errorValues

  const handleClose = () => dispatch(hideErrorModal())

  return(
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Body>
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          {errorMessage}
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}