import { CardGroup } from "react-bootstrap";
import { NewsCardItem } from "./NewsCardItem";


export function NewsCardList(props) {
  let newsData = props.newsData;
  return (
    <CardGroup >
      {newsData.slice(0, 10).map(item => (
        <NewsCardItem newsItem={item} />
      ))}
    </CardGroup>
  );
}
