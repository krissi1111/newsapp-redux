import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { News } from '../../services/fetchAPI';
import { showErrorModal } from './errorSlice';


const initialState = {
  searchString: '',
  searchTitle: true,
  searchSummary: true,
  searchDate: false,
  searchFeeds: false,
  searchFeedsData: [],
  searchFeedsSelected: [],
  dateRange: [new Date().toISOString(), new Date().toISOString()]
};

export const getFeeds = createAsyncThunk(
  'search/getFeeds',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await News.getFeeds()
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
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
    },
    setSearchFeeds: (state, action) => {
      state.searchFeeds = action.payload
    },
    setSearchFeedsSelected: (state, action) => {
      let feedId = action.payload
      let selectedFeeds = state.searchFeedsSelected
      let result
      if(selectedFeeds.includes(feedId)) {
        result = selectedFeeds.filter(id => id !== feedId)
      }
      else { 
        result = selectedFeeds
        result.push(feedId)
      }
      state.searchFeedsSelected = result
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFeeds.fulfilled, (state, action) => {
      let feeds = action.payload.data
      state.searchFeedsData = feeds;
      let feedIds = []
      feeds.map(feed => feedIds.push(feed.id))
      state.searchFeedsSelected = feedIds;
    });
  }
});

export const { 
  setSearchString, 
  setSearchTitle, 
  setSearchSummary, 
  setSearchDate,
  setDateRange,
  setSearchFeeds,
  setSearchFeedsSelected
 } = searchSlice.actions;

 export const selectSearch = (state) => state.search;

export default searchSlice.reducer;