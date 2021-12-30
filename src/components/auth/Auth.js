import { Tab, Tabs } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';


export function AuthContainer(props) {

  return(
    <Tabs 
      fill
      variant='pills'
      defaultActiveKey='Login' 
      id='Auth-tab' 
      className='mb-3'
      style={{flexDirection:'row'}}
    >
      <Tab eventKey='Login' title='Login'>
        <Login/>
      </Tab>
      <Tab eventKey='Register' title='Register'>
        <Register/>
      </Tab>
    </Tabs>
  )
}

export default AuthContainer