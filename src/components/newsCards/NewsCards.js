import { useEffect } from "react";
import { ButtonGroup, ButtonToolbar, Card, Container, Dropdown, DropdownButton, Pagination, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { NewsCardList } from "./NewsCardList";
import { changeItemPerPage, changePage, getNewsAll } from "../../redux/slices/newsDataSlice";
import { selectFavChecked, getUserFavs, selectLoggedIn } from "../../redux/slices/authSlice";

export function NewsCardContainer() {
  const newsData = useSelector((state) => state.newsCard.newsData)
  const apiStatus = useSelector((state) => state.newsCard.newsStatus)
  const favChecked = useSelector(selectFavChecked)
  const loggedIn = useSelector(selectLoggedIn)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(apiStatus === 'idle') dispatch(getNewsAll())
  }, [dispatch, apiStatus])

  useEffect(() => {
    if(!favChecked && loggedIn) dispatch(getUserFavs())
  }, [dispatch, favChecked, loggedIn])

  return (
      <Container fluid style={{ justifyContent: 'center', minHeight: '0rem', flexDirection: 'column', width:'100%'}}>
        <NewsCardPages style={{marginInline:'1%', justifyContent:'space-between'}}/>
        <NewsCardList newsData={newsData}/>
        <NewsCardPages className='mt-3' style={{marginInline:'1%', justifyContent:'space-between'}}/>
      </Container>
  )
}

export function NewsCardPages(props) {
  const newsDataState = useSelector((state) => state.newsCard)
  let { itemPerPage, pageCount, pageCurrent } = newsDataState
  const dispatch = useDispatch();
  const handlePageChange = (page) => {dispatch(changePage(page))}
  
  const pageCounts = [5, 10, 20, 50, 100]
  let pageList = Array.from({length:pageCount},(v,k)=>k+1) 

  return(
    <ButtonToolbar {...props}>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(0)}/>
        <Pagination.Prev onClick={() => handlePageChange(Math.max(pageCurrent-1, 0))}/>
        {
          pageList.map(page => 
            ((page-3 <= pageCurrent) && (pageCurrent <= page+1)) ?(
              <Pagination.Item 
                key={page} 
                active={page === pageCurrent + 1}
                onClick={() => handlePageChange(page-1)}
              >
                {page}
              </Pagination.Item>
              ) : (page === 1) ?(
              <Pagination.Item 
                key={page} 
                active={page === pageCurrent + 1}
                onClick={() => handlePageChange(page-1)}
              >
                {page}
              </Pagination.Item>
              ) : (page === 2 && pageCurrent >= 4) || (page === pageCount-1 && pageCurrent <= pageCount-2) ?(
              <Pagination.Ellipsis key={page}/>
              ) : (page === pageCount) ?(
              <Pagination.Item 
                key={page} 
                active={page === pageCurrent + 1}
                onClick={() => handlePageChange(page-1)}
              >
                {page}
              </Pagination.Item>
              ) : (
               null
              )
          )
        }
        <Pagination.Next onClick={() => handlePageChange(Math.min(pageCurrent+1, pageCount-1))}/>
        <Pagination.Last onClick={() => handlePageChange(pageCount-1)}/>
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

