import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { News, Favorite } from '../../services/fetchAPI';

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
  async() => {
    const response = await News.getAll()
    return response.json()
  }
)

export const getNewsSearch = createAsyncThunk(
  'news/getNewsSearch',
  async(arg, {getState}) => {
    const form = searchForm(getState().search)
    const response = await News.getSearch(form)
    return response.json()
  }
)

export const getNewsPopular = createAsyncThunk(
  'news/getNewsPopular',
  async(arg) => {
    const response = await News.getPopular()
    return response.json()
  }
)

export const addNews = createAsyncThunk(
  'news/addNews',
  async(arg) => {
    const response = await News.addNews()
    return response.json()
  }
)

export const favAddRemove = createAsyncThunk(
  'news/favAddRemove',
  async(arg) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    const response = await Favorite.addRemove(form)
    return response.status
  }
)

function searchForm(values) {
  const { searchString, searchTitle, searchSummary, searchDate, dateRange } = values
  const form = new FormData()
    if(searchTitle) form.append('title', searchString)
    else form.append('title', ' ')
    if(searchSummary) form.append('summary', searchString)
    else form.append('summary', ' ')
    if(searchDate) {
      form.append('dateStart', dateRange[0])
      form.append('dateEnd', dateRange[1])
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
        let news = action.payload
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
        let news = action.payload
        state.newsData = news;
        state.pageCurrent = 0
        let length = Math.min(state.newsData.length, state.newsDataMaxLength)
        let itemPerPage = state.itemPerPage
        state.pageCount = Math.ceil(length/itemPerPage)
        newsDataSlice.caseReducers.setNewsDataView(state)
      })
      .addCase(getNewsPopular.fulfilled, (state, action) => {
        let {comments, favorites} = action.payload
        state.newsDataPopularCom = comments
        state.newsDataPopularFav = favorites
        state.favStatus = true
      })
      .addCase(addNews.fulfilled, (state, action) => {
        console.log(action.payload)
      });
  }
})

export const { changePage, changeItemPerPage } = newsDataSlice.actions

export default newsDataSlice.reducer;