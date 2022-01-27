import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comments, Reply } from '../../services/fetchAPI';
import { getNewsPopular } from './newsDataSlice';

const initialState = {
  commentData: [],
  status: 'idle'
}

export const getComments = createAsyncThunk(
  'comments/getComments',
  async(newsId) => {
    const form = new FormData()
    form.append('newsId', newsId)
    const response = await Comments.getList(form)
    return response.json()
  }
)

export const addComment = createAsyncThunk(
  'comments/addComment',
  async(arg, { dispatch }) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    form.append('commentText', arg.text)
    const response = await Comments.add(form)
    dispatch(getComments(arg.newsId))
    dispatch(getNewsPopular())
    return response.json()
  }
)

export const addReply = createAsyncThunk(
  'comments/addReply',
  async(arg, { dispatch }) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    form.append('replyText', arg.text)
    form.append('commentId', arg.commentId)
    const response = await Reply.add(form)
    dispatch(getComments(arg.newsId))
    return response.json()
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async(arg, { dispatch, getState }) => {
    const form = new FormData()
    form.append('commentId', arg.commentId)
    const response = await Comments.delete(form)
    let newsId =  getState().newsModal.item.id
    dispatch(getComments(newsId))
    dispatch(getNewsPopular())
    return response.json()
  }
)

export const deleteReply = createAsyncThunk(
  'comments/deleteReply',
  async(arg, { dispatch, getState }) => {
    const form = new FormData()
    form.append('replyId', arg.replyId)
    const response = await Comments.deleteReply(form)
    let newsId = getState().newsModal.item.id
    dispatch(getComments(newsId))
    dispatch(getNewsPopular())
    return response.json()
  }
)

export const editComment = createAsyncThunk(
  'comments/editComment',
  async(arg, { dispatch, getState }) => {
    const form = new FormData()
    form.append('commentId', arg.commentId)
    form.append('commentText', arg.text)
    const response = await Comments.edit(form)
    let newsId = getState().newsModal.item.id
    dispatch(getComments(newsId))
    return response.json()
  }
)

export const editReply = createAsyncThunk(
  'comment/editReply',
  async(arg, { dispatch, getState }) => {
    const form = new FormData()
    form.append('replyId', arg.replyId)
    form.append('replyText', arg.text)
    const response = await Comments.editReply(form)
    let newsId = getState().newsModal.item.id
    dispatch(getComments(newsId))
    return response.json()
  }
)

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    unloadComments: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getComments.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(getComments.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.commentData = action.payload
    })
  }
})

export const { unloadComments } = commentSlice.actions;

export default commentSlice.reducer