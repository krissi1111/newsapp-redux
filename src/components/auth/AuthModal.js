import { Button, Modal, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, showAuthModal, setShowUserModal, logout } from "../../redux/slices/authSlice";
import AuthContainer from "./Auth";
import { UserContainer } from "./User";


export function AuthModal() {
  let { loggedIn, showModal, user } = useSelector(selectAuth)
  const dispatch = useDispatch();
  const handleShowModal = () => dispatch(showAuthModal())
  const handleShowUserModal = () => dispatch(setShowUserModal())
  const handleLogOut = () => dispatch(logout())

  return(
    <>
    <Navbar.Collapse className="justify-content-end mx-1">
    {!loggedIn ?(
      <Navbar.Text className="mx-2" style={{color:'white'}}>
          Not signed in
      </Navbar.Text>
        ) : (
      <Navbar.Text className='py-0' style={{color:'white'}}>
        Signed in as: 
          <Button 
            className="mx-2 my-0" 
            variant="outline-light" 
            size="sm"
            onClick={handleShowUserModal}
          > 
            {user.firstName + ' ' + user.lastName}
          </Button>
      </Navbar.Text>
      )
    }
    </Navbar.Collapse>
    {!loggedIn ?(
      <Button 
        variant="outline-light" 
        onClick={handleShowModal}
      >
        Login / Register
      </Button>
      ) : (
        <Button 
        variant="outline-light" 
        onClick={handleLogOut}
      >
        Log Out
      </Button>
      )}
      <Modal show={showModal} onHide={handleShowModal} centered>
        <Modal.Header closeButton>Login / Register</Modal.Header>
        <Modal.Body>
          <AuthContainer/>
        </Modal.Body>
      </Modal>
      <UserContainer/>
    </>
  )
}