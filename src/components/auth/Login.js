import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginForm } from "../../redux/slices/authSlice";


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

export default Login