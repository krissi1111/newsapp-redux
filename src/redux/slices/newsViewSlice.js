import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  newsDataView: [],
  pageCurrent: 0,
  pageCount: 0,
  itemPerPage: 10,

}

export const newsViewSlice = createSlice({
  name: 'newsView',
  initialState,
  reducers: {
    changePage: (state, action) => {

    }
  }
})

export default newsViewSlice