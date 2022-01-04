import { Tab, Tabs } from 'react-bootstrap';
import Login, { LoginTest } from './Login';
import Register from './Register';


export function AuthContainer(props) {

  return(
    /*<Tabs 
      fill
      variant='pills'
      defaultActiveKey='Login' 
      id='Auth-tab' 
      className='mb-3'
      style={{flexDirection:'row'}}
    >
      <Tab eventKey='Login' title='Login'>
        <LoginTest/>
      </Tab>
      <Tab eventKey='Register' title='Register'>
        <Register/>
      </Tab>
    </Tabs>*/
    <LoginTest/>
  )
}

export default AuthContainer