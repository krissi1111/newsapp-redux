import { useEffect } from "react";
import { ButtonGroup, ButtonToolbar, Card, Container, Dropdown, DropdownButton, Pagination, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { NewsCardList } from "./NewsCardList";
import { NewsModal } from './NewsModal';
import { changeItemPerPage, changePage, getNewsSearch } from "../../redux/slices/newsDataSlice";

export function NewsCardContainer() {
  const newsData = useSelector((state) => state.newsCard.newsData)
  const apiStatus = useSelector((state) => state.newsCard.status)
  const dispatch = useDispatch();
  
  useEffect(() =>{
    if(apiStatus === 'idle') dispatch(getNewsSearch())
  }, [dispatch, apiStatus])

  return (
      <Container fluid style={{ justifyContent: 'center', minHeight: '50rem', flexDirection: 'column', width:'100%'}}>
        <NewsCardPages/>
        <NewsCardList newsData={newsData}/>
      </Container>
  )
}

export function NewsCardPages() {
  const newsDataState = useSelector((state) => state.newsCard)
  let { itemPerPage, pageCount, pageCurrent } = newsDataState
  const dispatch = useDispatch();
  
  const pageCounts = [5, 10, 20, 50, 100]
  let pageList = Array.from({length:pageCount},(v,k)=>k+1) 

  return(
    <ButtonToolbar style={{marginInline:'1%', justifyContent:'space-between'}}>
      <Pagination>
        {
          pageList.map(page => 
            <Pagination.Item 
              key={page} 
              active={page === pageCurrent + 1}
              onClick={() => dispatch(changePage(page-1))}
            >
              {page}
            </Pagination.Item>
          )
        }
      </Pagination>
      <Dropdown>
        <DropdownButton as={ButtonGroup} title='Items per page'>
          {
            pageCounts.map(amount => 
              <Dropdown.Item 
                key={amount}
                active={amount === itemPerPage}
                onClick={() => dispatch(changeItemPerPage(amount))}
              >
                {amount}
              </Dropdown.Item>
              )
          }
        </DropdownButton>
      </Dropdown>
    </ButtonToolbar>
  )
}

