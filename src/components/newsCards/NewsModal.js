import { Button, ButtonGroup, Card, Form, Image, Modal, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from "../../redux/slices/newsModalSlice";


export function NewsModal(props) {
  const dispatch = useDispatch();
  const modalValues = useSelector((state) => state.newsModal)
  let { show, item, status } = modalValues
  let { id, title, summary, link, image, date, origin } = item
  let modalTitle = origin + ' - ' + new Date(date).toLocaleString('en-UK')

  const handleClose = () => dispatch(showModal(false))

  return(
    <>
      {status === 'initial' ? (
        <></>
      ) : (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {modalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              variant="top" 
              src={image} 
              style={{ width: "100%", maxHeight: '20rem', objectFit: 'cover'}}
            />
            <Modal.Title id="contained-modal-title-vcenter" style={{ marginBlock: '0.5rem' }}>
              {title}
            </Modal.Title>
            <p>
              {summary}
            </p>
          </Modal.Body>
          <Modal.Footer style={{display:'flex', justifyContent: 'space-between'}}>
            <Button variant="outline-primary">favButtonText</Button>
            <ButtonGroup style={{ display:'flex', alignItems:'center'}}>
              <Button >Delete</Button>
              <Button href={link} variant="outline-primary">Visit site</Button>{' '}
              <Button onClick={handleClose}>Close</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      )
      }
    </>
  )
}

export default NewsModal