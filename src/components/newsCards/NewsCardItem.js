import { Button, ButtonGroup, Card, Toast } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {setModalItem} from '../../redux/slices/newsModalSlice'
import { Waypoint } from 'react-waypoint';
import { useState } from "react";

export function NewsCardItem(props) {
  let { title, summary, link, image, date, origin } = props.newsItem;
  const dispatch = useDispatch();
  let [imgSource, setImageSource] = useState('')

  const summaryLength = 150;
  if (summary.length > summaryLength)
    summary = summary.substring(0, summaryLength) + "...";
  date = new Date(date).toLocaleString('en-UK');
  return (
    <Waypoint 
      onEnter={() => setImageSource(image)}
      bottomOffset={"-10%"}
    >
      <Card
        style={{
          minWidth: '17.5rem',
          maxWidth: '17.5rem',
          border: '1px solid #999',
          margin: '0.325rem'
        }}
      >
        <Card.Img
          variant="top"
          src={imgSource}
          style={{ width: "100%", maxHeight: '10rem', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {date}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {origin}
          </Card.Subtitle>
          <Card.Text>{summary}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: 'white' }}>
          <ButtonGroup style={{ display: 'flex', alignItems: 'center' }}>
            <Button href={link} variant="outline-primary">Visit site</Button>{' '}
            <Button onClick={() => dispatch(setModalItem(props.newsItem))}>View</Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Waypoint>
  );
}
