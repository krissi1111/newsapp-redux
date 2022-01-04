import { useState } from "react";
import { Accordion, Button, ButtonGroup, Form, Tabs, useAccordionButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginForm, register, showAuthModal } from "../../redux/slices/authSlice";


export function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const dispatch = useDispatch();
  const handleLogin = (event) => {
    event.preventDefault()
    const form = new FormData()
    form.append('Username', username)
    form.append('Password', password)
    dispatch(loginForm(form))
    dispatch(showAuthModal())
  }
 
  return(
    <Form onSubmit={handleLogin}>
      <Form.Group controlId='Username'>
        <Form.Label>
          Username
        </Form.Label>
        <Form.Control
          className="mb-3"
          value={username}
          onChange={handleUsername}
          type='text'
          placeholder='Type your username'
        />
      </Form.Group>

      <Form.Group controlId='Password'>
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control
          className="mb-3"
          value={password}
          onChange={handlePassword}
          type='password'
          placeholder='Type your password'
        />
      </Form.Group>
      <Button type='submit'>Log in</Button>
    </Form>
  )
}

export function LoginTest(props) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userType, setUserType] = useState('User')

  const [activeTab, setActiveTab] = useState(false)

  const handleUsername = (event) => setUsername(event.target.value)
  const handleFirstName = (event) => setFirstName(event.target.value)
  const handleLastName = (event) => setLastName(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)
  const handlePassword2 = (event) => setPassword2(event.target.value)
  const handleUserType = (event) => setUserType(event.target.value)

  const handleTabChange = () => setActiveTab(!activeTab)

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData()
    form.append('Username', username)
    form.append('Password', password)
    if(!activeTab) dispatch(loginForm(form))
    else {
      form.append('FirstName', firstName)
      form.append('LastName', lastName)
      form.append('UserType', userType)
      dispatch(register(form))
    }
    dispatch(showAuthModal())
  }

  return(

    <Accordion>
      <ToggleButton 
        active={activeTab}
        handleTabChange={() => handleTabChange()} 
        variant='primary' 
        eventKey='0'
      >
        Login
      </ToggleButton>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='Username'>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control
            className="mb-3"
            value={username}
            onChange={handleUsername}
            type='text'
            placeholder='Type your username'
          />
        </Form.Group>
        <Accordion.Collapse eventKey='0'>
          <>
          <Form.Group controlId='FirstName'>
          <Form.Label>
            First name
          </Form.Label>
          <Form.Control
            className="mb-3"
            value={firstName}
            onChange={handleFirstName}
            type='text'
            placeholder='First name'
          />
        </Form.Group>

        <Form.Group controlId='LastName'>
          <Form.Label>
            Last name
          </Form.Label>
          <Form.Control
            className="mb-3"
            value={lastName}
            onChange={handleLastName}
            type='text'
            placeholder='Last name'
          />
        </Form.Group>
        </>
        </Accordion.Collapse>

        <Form.Group controlId='Password'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            className="mb-3"
            value={password}
            onChange={handlePassword}
            type='password'
            placeholder='Type your password'
          />
        </Form.Group>
        <Accordion.Collapse eventKey='0'>
          <>
            <Form.Group controlId='Password2'>
              <Form.Label>
                Re-Type Password
              </Form.Label>
              <Form.Control
                className="mb-3"
                value={password2}
                onChange={handlePassword2}
                type='password'
                placeholder='Re-Type your password'
              />
            </Form.Group>
            <Form.Group controlId='UserType'>
              <Form.Label>
                User type
              </Form.Label>
              <Form.Select
                className="mb-3"
                value={userType}
                onChange={handleUserType}
                disabled
              >
                <option value='User'>User</option>
                <option value='Admin'>Admin</option>
              </Form.Select>
            </Form.Group>
          </>
        </Accordion.Collapse>

        <Button className='w-100' size='sm' type='submit'>Sign in</Button>
      </Form>
    </Accordion>
  )
}


function ToggleButton({ children, eventKey, active, handleTabChange, ...props }) {
  const decoratedOnClick = useAccordionButton(eventKey)

  return(
    <ButtonGroup  className='mt-1 mb-3' style={{display:'flex'}} onClick={()=>{
      decoratedOnClick()
      handleTabChange()
      }}>
    <Button
      variant={!active ?('primary') : ('outline-primary')}
      size='sm'
      className='mx-auto'
    >
      Login
    </Button>
    <Button
      variant={active ?('primary') : ('outline-primary')}
      size='sm'
      className='mx-auto'
    >
      Register
    </Button>
    </ButtonGroup>
  )
}

export default Login