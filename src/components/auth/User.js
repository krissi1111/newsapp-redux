import { Button, Card, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserModal } from "../../redux/slices/authSlice";
import { PopularContainer } from "../popular.js/Popular";
import { addNews } from "../../redux/slices/newsDataSlice";


export function UserContainer(props) {
  let showModal = useSelector((state) => state.auth.showUserModal)
  const dispatch = useDispatch();
  const handleShowModal = () => dispatch(setShowUserModal())
  const user = useSelector((state) => state.auth.user)


  return(
    <Modal show={showModal} onHide={handleShowModal} centered size="xl">
      <Modal.Header>
        User info
      </Modal.Header>
      <Modal.Body>
        <UserInfo className='w-25'/>
        <Tabs
          fill
          variant='pills'
          defaultActiveKey='0' 
          id='User-tab' 
          style={{flexDirection:'row'}}
        >
          <Tab
            eventKey='0'
            title='User Info'
          >
            <PopularContainer/>
          </Tab>
          {user.userType === 'Admin' ?(
          <Tab
            eventKey='1'
            title='User Info'
          >
            <Button onClick={() => dispatch(addNews())}>Add news</Button>
          </Tab>
          ) : (<></>)
          }
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export function UserInfo(props) {
  const user = useSelector((state) => state.auth.user)

  return(
    <Form {...props}>
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
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5}>
          User type:
        </Form.Label>
        <Col>
          <Form.Control 
            type="text" 
            readOnly 
            value={user.userType}
            />
        </Col>
      </Form.Group>
    </Form>
  )
}

export default UserInfo