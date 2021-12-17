import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetcher } from '../../services/fetchAPI';

const initialState = {
  newsData: [],
  status: 'idle',
};

export const getNewsAll = createAsyncThunk(
  'news/getNewsAll',
  async() => {
    const response = await fetcher('GET')
    return response.json()
  }
)

export const getNewsSearch = createAsyncThunk(
  'news/getNewsSearch',
  async(arg, {getState}) => {
    const form = searhForm(getState().search)
    const response = await fetcher('POST', form)
    return response.json()
  }
)

function searhForm(values) {
  const { searchString, searchTitle, searchSummary, searchDate, dateRange } = values
  const form = new FormData()
    if(searchTitle) form.append('title', searchString)
    if(searchSummary) form.append('summary', searchString)
    if(searchDate) {
      form.append('dateStart', dateRange[0].toISOString())
      form.append('dateEnd', dateRange[1].toISOString())
    }
  return form
}

export const newsCardSlice = createSlice({
  name: 'newsCard',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getNewsAll.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNewsAll.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.newsData = action.payload;
      })
      .addCase(getNewsSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNewsSearch.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.newsData = action.payload;
      })
      ;
  }
})

export default newsCardSlice.reducer;