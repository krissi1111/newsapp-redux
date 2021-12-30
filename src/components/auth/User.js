import { Card, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";



export function UserContainer(props) {

  return(
    <Modal>
      <Modal.Header>

      </Modal.Header>
      <Modal.Body>
        <Tabs
          fill
          variant='pills'
          defaultActiveKey='Info' 
          id='User-tab' 
        >
          <Tab
            eventKey='Info'
            title='User Info'
          >
            <UserInfo/>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export function UserInfo(props) {
  const user = useSelector((state) => state.auth.user)

  return(
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5}>
          Username:
        </Form.Label>
        <Col>
          <Form.Control 
            type="text" 
            readOnly 
            value={user.username}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5}>
          First name:
        </Form.Label>
        <Col>
          <Form.Control 
            type="text" 
            readOnly 
            value={user.firstName}
            />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5}>
          Last name:
        </Form.Label>
        <Col>
          <Form.Control 
            type="text" 
            readOnly 
            value={user.lastName}
            />
        </Col>
      </Form.Group>
    </Form>
  )
}

export default UserInfo