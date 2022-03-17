import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { News } from '../../services/fetchAPI';
import { showErrorModal } from './errorSlice';

const initialState = {
  newsData: [],
  newsDataView: [],
  newsDataPopularCom: [],
  newsDataPopularFav: [],
  newsDataStart: 0,
  newsDataEnd: 10,
  newsDataMaxLength: 100,
  pageCurrent: 0,
  pageCount: 10,
  itemPerPage: 10,
  newsStatus: 'idle',
  favStatus: false
};

export const getNewsAll = createAsyncThunk(
  'news/getNewsAll',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await News.getAll()
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const getNewsSearch = createAsyncThunk(
  'news/getNewsSearch',
  async(arg, { getState, rejectWithValue, fulfillWithValue, dispatch}) => {
    const form = searchForm(getState().search)
    const response = await News.getSearch(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const getNewsPopular = createAsyncThunk(
  'news/getNewsPopular',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await News.getPopular()
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const addNews = createAsyncThunk(
  'news/addNews',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await News.addNews()
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch}) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    const response = await News.delete(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      dispatch(getNewsSearch())
      dispatch(getNewsPopular())
      return fulfillWithValue(res)
    })
  }
)
/*
export const favAddRemove = createAsyncThunk(
  'news/favAddRemove',
  async(arg, {dispatch}) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    const response = await Favorite.addRemove(form)
    dispatch(getNewsPopular())
    return response.status
  }
)
*/
function searchForm(values) {
  const { 
    searchString, 
    searchTitle, 
    searchSummary, 
    searchDate, 
    dateRange, 
    searchFeeds,
    searchFeedsSelected } = values
  const form = new FormData()
    if(searchTitle) form.append('title', searchString)
    else form.append('title', ' ')

    if(searchSummary) form.append('summary', searchString)
    else form.append('summary', ' ')

    if(searchDate) {
      form.append('dateStart', dateRange[0])
      form.append('dateEnd', dateRange[1])
    }
    if(searchFeeds){
      let feeds = searchFeedsSelected
      feeds.map(id => (
        form.append('newsFeedIds', id)
      ))
    }

  return form
}

export const newsDataSlice = createSlice({
  name: 'newsCard',
  initialState,
  reducers: {
    setNewsDataView: (state) => {
      let { itemPerPage, pageCurrent, pageCount, newsData } = state
      let start = itemPerPage * pageCurrent
      let stop
      if(pageCurrent !== pageCount - 1) stop = start + itemPerPage
      else stop = state.newsDataMaxLength
      state.newsDataView = newsData.slice(start, stop)
    },
    changePage: (state, action) => {
      state.pageCurrent = action.payload
      newsDataSlice.caseReducers.setNewsDataView(state)
    },
    changeItemPerPage: (state, action) => {
      state.pageCurrent = 0
      let length = Math.min(state.newsData.length, state.newsDataMaxLength)
      let itemPerPage = action.payload
      state.pageCount = Math.ceil(length/itemPerPage)
      state.itemPerPage = itemPerPage
      newsDataSlice.caseReducers.setNewsDataView(state)
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getNewsAll.pending, (state) => {
        state.newsStatus = 'loading';
      })
      .addCase(getNewsAll.fulfilled, (state, action) => {
        state.newsStatus = 'loaded';
        let news = action.payload.data
        state.newsData = news;
        state.pageCurrent = 0
        let length = Math.min(state.newsData.length, state.newsDataMaxLength)
        let itemPerPage = state.itemPerPage
        state.pageCount = Math.ceil(length/itemPerPage)
        newsDataSlice.caseReducers.setNewsDataView(state)
      })
      .addCase(getNewsSearch.pending, (state) => {
        state.newsStatus = 'loading';
      })
      .addCase(getNewsSearch.fulfilled, (state, action) => {
        state.newsStatus = 'loaded';
        let news = action.payload.data
        state.newsData = news;
        state.pageCurrent = 0
        let length = Math.min(state.newsData.length, state.newsDataMaxLength)
        let itemPerPage = state.itemPerPage
        state.pageCount = Math.ceil(length/itemPerPage)
        newsDataSlice.caseReducers.setNewsDataView(state)
      })
      .addCase(getNewsPopular.fulfilled, (state, action) => {
        let {comments, favorites} = action.payload.data
        state.newsDataPopularCom = comments
        state.newsDataPopularFav = favorites
        state.favStatus = true
      })
      .addCase(addNews.pending, (state, action) => {
        state.newsStatus = 'loading';
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.newsStatus = 'loaded';
        console.log(action.payload.data)
      });
  }
})

export const { changePage, changeItemPerPage } = newsDataSlice.actions

export default newsDataSlice.reducer;