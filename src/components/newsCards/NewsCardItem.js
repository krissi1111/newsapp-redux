import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {setItem} from '../../redux/slices/newsModalSlice'

export function NewsCardItem(props) {
  let { title, summary, link, image, date, origin } = props.newsItem;
  const dispatch = useDispatch();

  const summaryLength = 150;
  if (summary.length > summaryLength)
    summary = summary.substring(0, summaryLength) + "...";
  date = new Date(date).toLocaleString('en-UK');

  return (
    <Card
      style={{
        minWidth: '18rem',
        maxWidth: '18rem',
        border: '1px solid #999',
        margin: '0.325rem'
      }}
    >
      <Card.Img
        variant="top"
        src={image}
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
          <Button onClick={() => dispatch(setItem(props.newsItem))}>Modal</Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
}
