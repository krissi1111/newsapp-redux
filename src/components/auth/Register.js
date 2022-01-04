import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";


export function Register(props) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User')

  const handleUsername = (event) => setUsername(event.target.value)
  const handleFirstName = (event) => setFirstName(event.target.value)
  const handleLastName = (event) => setLastName(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)
  const handleUserType = (event) => setUserType(event.target.value)

  const dispatch = useDispatch();

  const handleRegister = (event) => {
    event.preventDefault()
    const form = new FormData()
    form.append('Username', username)
    form.append('FirstName', firstName)
    form.append('LastName', lastName)
    form.append('Password', password)
    form.append('UserType', userType)
    dispatch(register(form))
  }
 
  return(
    <Form onSubmit={handleRegister}>
      <Form.Group controlId='Username'>
        <Form.Label>
          Username
        </Form.Label>
        <Form.Control
          className="mb-3"
          value={username}
          onChange={handleUsername}
          type='text'
          placeholder='Username'
        />
      </Form.Group>

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

      <Form.Group controlId='Password'>
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control
          className="mb-3"
          value={password}
          onChange={handlePassword}
          type='password'
          placeholder='Password'
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

      <Button type='submit'>Register</Button>
    </Form>
  )
}

export default Register