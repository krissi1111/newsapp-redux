import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewsCardContainer } from './components/newsCards/NewsCards';
import { SearchContainer } from './components/search/Search'
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col xs sm md lg xl xxl="2">
          <SearchContainer/>
        </Col>
        <Col xs sm md lg xl xxl="8">
          <NewsCardContainer/>
        </Col>
        <Col xs sm md lg xl xxl="2">

        </Col>
      </Row>
    </Container>
    
  );
}

export default App;
