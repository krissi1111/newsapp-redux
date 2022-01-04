import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNewsPopular } from "../../redux/slices/newsDataSlice";
import { setModalItem } from "../../redux/slices/newsModalSlice";



export function PopularContainer(props) {
  const dispatch = useDispatch();
  const newsDataState = useSelector((state) => state.newsCard)
  const topNewsByComments = newsDataState.newsDataPopularCom
  const topNewsByFavorites = newsDataState.newsDataPopularFav
  let favStatus = useSelector((state) => state.newsCard.favStatus)

  useEffect(() => {
    dispatch(getNewsPopular())
  }, [dispatch])

  return( 
    <>
    <h4>Most popular news</h4>
    <Tabs
      fill
      variant='tabs'
      defaultActiveKey='com' 
      id='Auth-tab' 
      className='mb-2 mt-3'
      style={{flexDirection:'row'}}
    >
      <Tab eventKey='com' title='Most Commented'>
        <ListGroup as="ol" numbered className="">
          {topNewsByComments.map(item => (
            <PopularItem item={item}/>
          ))}
        </ListGroup>
      </Tab>
      <Tab eventKey='fav' title='Most Favorited'>
      <ListGroup as="ol" numbered>
          {topNewsByFavorites.map(item => (
            <PopularItem item={item}/>
          ))}
        </ListGroup>
      </Tab>
    </Tabs>
    </>
  )
}



export function PopularItem(props) {
  let item = props.item
  let { title, image, date, comments } = item;
  const dispatch = useDispatch();

  return(
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
      onClick={() => dispatch(setModalItem(item))}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{title}</div>
        {new Date(date).toLocaleString('en-UK')}
      </div>
      <Badge bg="secondary" pill>
        {comments}
      </Badge>
    </ListGroup.Item>
  )
}