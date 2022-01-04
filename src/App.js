import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewsCardContainer } from './components/newsCards/NewsCards';
import { SearchContainer } from './components/search/Search'
import { Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import { loginToken } from './redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthModal } from './components/auth/AuthModal';
import { PopularContainer } from './components/popular.js/Popular';
import UserInfo from './components/auth/User';

function App() {
  const dispatch = useDispatch();
  const apiStatus = useSelector((state) => state.auth.loggedIn)
  useEffect(() =>{
    if(!apiStatus) dispatch(loginToken())
  }, [dispatch, apiStatus])

  return (
    <>
      <Navbar bg="secondary" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand style={{color:'white'}}>NewsApp</Navbar.Brand>
          <AuthModal/>
        </Container>
      </Navbar>
      <Container fluid style={{marginTop:'4rem'}}>
        <Row>
          <Col xs sm md lg xl xxl="2">
            <Card>
              <Card.Body>
                <SearchContainer/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs sm md lg xl xxl="8">
            <Card>
              <Card.Body>
                <NewsCardContainer/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs sm md lg xl xxl="2">
            <Card>
              <Card.Body>
                <PopularContainer/>
                <UserInfo/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
