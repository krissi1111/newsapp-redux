import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { NewsCardList } from "./NewsCardList";
import { getNewsAll, getNewsSearch } from "../../redux/slices/newsDataSlice";

export function NewsCardContainer() {
  const newsData = useSelector((state) => state.newsCard.newsData)
  const apiStatus = useSelector((state) => state.newsCard.status)
  const dispatch = useDispatch();
  
  useEffect(() =>{
    if(apiStatus === 'idle') dispatch(getNewsSearch())
  }, [dispatch, apiStatus])

  return (
    <>
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50rem'}}>
      {apiStatus !== 'loaded' ?(
        <Spinner animation="border"/>
      ) : newsData.length === 0 ?(
        <h1>No data</h1>
      ) : (
        <NewsCardList newsData={newsData}/>
      )}
      </Container>
    </>
  )
}

