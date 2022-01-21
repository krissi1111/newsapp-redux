import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { News } from '../../services/fetchAPI';


const initialState = {
  searchString: ' ',
  searchTitle: true,
  searchSummary: true,
  searchDate: false,
  dateRange: [new Date().toISOString(), new Date().toISOString()]
};

export const getNewsSearch = createAsyncThunk(
  'search/getNewsSearch',
  async(arg, {getState}) => {
    const state = getState()
    const form = new FormData()
    form.append('title', state.search.searchString)
    const response = await News.getSearch(form)
    return response.json()
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.searchString = action.payload
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload
    },
    setSearchSummary: (state, action) => {
      state.searchSummary = action.payload
    },
    setSearchDate: (state) => {
      let currentState = state.searchDate
      state.searchDate = !currentState
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getNewsSearch.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getNewsSearch.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.newsData = action.payload;
    })
    ;
  }
});

export const { 
  setSearchString, 
  setSearchTitle, 
  setSearchSummary, 
  setSearchDate,
  setDateRange
 } = searchSlice.actions;

 export const selectSearch = (state) => state.search;

export default searchSlice.reducer;