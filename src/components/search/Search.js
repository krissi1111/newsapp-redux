import { Button, Card, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getNewsSearch } from "../../redux/slices/newsDataSlice";
import {
  setSearchString, 
  setSearchTitle, 
  setSearchSummary,
  selectSearch
} from '../../redux/slices/newsSearchSlice';
import { SearchDate } from "./SearchDate";


export function SearchContainer(props) {
  const dispatch = useDispatch();
  const handleSearch = (event) => dispatch(getNewsSearch(event.target.value))

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
        <Button onClick={handleSearch}>Search</Button>
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

export default SearchContainer