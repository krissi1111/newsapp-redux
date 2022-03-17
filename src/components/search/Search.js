import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { Button, Collapse, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getNewsSearch } from "../../redux/slices/newsDataSlice";
import {
  setSearchString, 
  setSearchTitle, 
  setSearchSummary,
  selectSearch,
  getFeeds,
  setSearchFeeds,
  setSearchFeedsSelected
} from '../../redux/slices/newsSearchSlice';
import { SearchDate } from "./SearchDate";


export function SearchContainer(props) {
  const dispatch = useDispatch();
  const handleSearch = (event) => dispatch(getNewsSearch(event.target.value))

  useEffect(() => {
    dispatch(getFeeds())
  }, [dispatch])

  return(
    <>
        <Row className="mb-3">
          <SearchString/>
        </Row>
        <Row className="mb-3">
          <SearchSelectors/>
        </Row>
        <Row className="mb-3">
          <SearchDate/>
        </Row>
        <Row className="mb-3">
          <SearchFeeds/>
        </Row>
        <Button onClick={handleSearch}>
          <Icon inline={true} icon='ant-design:file-search-outlined'/> Search
        </Button>
    </>
  )
}

function SearchString() {
  let { searchString } = useSelector(selectSearch)
  const dispatch = useDispatch();
  const handleSearchString = (event) => dispatch(setSearchString(event.target.value))

  return (
    <Form.Group controlId='searchString'>
      <Form.Label>Search</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchString}
        onChange={handleSearchString} />
    </Form.Group>
  );
}

function SearchSelectors() {
  let { searchTitle, searchSummary } = useSelector(selectSearch)
  
  const dispatch = useDispatch();
  const handleSearchSelection = (title, summary) => {
    dispatch(setSearchTitle(title));
    dispatch(setSearchSummary(summary));
  }

  return (
    <Form.Group>
      <Form.Check
        type="radio"
        checked={searchTitle && searchSummary}
        onChange={() => handleSearchSelection(true, true)}
        label="Search All" />
      <Form.Check
        type="radio"
        checked={searchTitle && !searchSummary}
        onChange={() => handleSearchSelection(true, false)}
        label="Search Title" />
      <Form.Check
        type="radio"
        checked={!searchTitle && searchSummary}
        onChange={() => handleSearchSelection(false, true)}
        label="Search Summary" />
    </Form.Group>
  );
}

function SearchFeeds() {
  let { searchFeedsData, searchFeedsSelected, searchFeeds } = useSelector(selectSearch)
  
  const dispatch = useDispatch();
  const handleSetSearchFeeds = (search) => {
    dispatch(setSearchFeeds(search))
  }
  const handleFeedSelection = (feedId) => {
    dispatch(setSearchFeedsSelected(feedId))
  }

  return (
    <Form.Group>
      <Form.Label>Feeds</Form.Label>
      <Form.Check 
        type="radio"
        label="Search all feeds"
        checked={!searchFeeds}
        onChange={() => handleSetSearchFeeds(false)}
      />
      <Form.Check 
        type="radio"
        label="Select feeds"
        checked={searchFeeds}
        onChange={() => handleSetSearchFeeds(true)}
      />
      <Collapse in={searchFeeds}>
        <div>
          {searchFeedsData.map(feed => (
            <Form.Check
              key={feed.feedName}
              className="mx-3"
              type="checkbox"
              label={feed.feedName}
              checked={searchFeedsSelected.includes(feed.id)}
              onChange={() => handleFeedSelection(feed.id)}
            />
          ))}
        </div>
      </Collapse>
    </Form.Group>
  )
}

export default SearchContainer