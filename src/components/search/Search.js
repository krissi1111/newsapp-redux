import { useEffect, useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getNewsSearch } from "../../redux/slices/newsDataSlice";

import {
  setSearchString, 
  setSearchTitle, 
  setSearchSummary,
  selectSearch
} from '../../redux/slices/searchSlice';
import { SearchDate } from "./SearchDate";


export function SearchContainer(props) {
  const dispatch = useDispatch();

  return(
    <Card>
      <Card.Body>
        <Row className="mb-3">
          <SearchString/>
        </Row>
        <Row className="mb-3">
          <SearchSelectors/>
        </Row>
        <Row className="mb-3">
          <SearchDate/>
        </Row>
        <Button onClick={() => dispatch(getNewsSearch())}>search</Button>
      </Card.Body>
    </Card>
  )
}

export default SearchContainer

function SearchString() {
  let { searchString } = useSelector(selectSearch)
  const dispatch = useDispatch();
  return (
    <Form.Group controlId='searchString'>
      <Form.Label>Search</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchString}
        onChange={event => dispatch(setSearchString(event.target.value))} />
    </Form.Group>
  );
}

function SearchSelectors() {
  let { searchTitle, searchSummary } = useSelector(selectSearch)
  const dispatch = useDispatch();
  return (
    <Form.Group>
      <Form.Check
        type="radio"
        checked={searchTitle && searchSummary}
        onChange={() => {
          dispatch(setSearchTitle(true));
          dispatch(setSearchSummary(true));
        } }
        label="Search All" />
      <Form.Check
        type="radio"
        checked={searchTitle && !searchSummary}
        onChange={() => {
          dispatch(setSearchTitle(true));
          dispatch(setSearchSummary(false));
        } }
        label="Search Title" />
      <Form.Check
        type="radio"
        checked={!searchTitle && searchSummary}
        onChange={() => {
          dispatch(setSearchTitle(false));
          dispatch(setSearchSummary(true));
        } }
        label="Search Summary" />
    </Form.Group>
  );
}
