import { CardGroup, Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NewsCardItem } from "./NewsCardItem";
import NewsModal from "./NewsModal";


export function NewsCardList(props) {
  //let newsData = props.newsData;
  const newsDataState = useSelector((state) => state.newsCard)
  const { newsStatus, itemPerPage } = newsDataState
  let newsData = newsDataState.newsDataView

  return (
    <>
      {newsStatus !== 'loaded' ?(
        <Spinner animation="border"/>
      ) : newsData.length === 0 ?(
        <h1>No data</h1>
      ) : (
        <>
          <CardGroup style={{display:'flex', justifyContent:'space-evenly'}}>
            {newsData.map(item => (
              <NewsCardItem key={item.link} newsItem={item}/>
            ))}
          </CardGroup>
          <NewsModal/>
        </>
      )}
    </>
  );
}
