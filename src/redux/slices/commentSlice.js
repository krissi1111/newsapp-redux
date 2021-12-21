import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comments } from '../../services/fetchAPI';

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
  async(newsId, commentText) => {
    const form = new FormData()
    form.append('newsId', newsId)
    form.append('commentText', commentText)
    const response = await Comments.add(form)
    return response.json()
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async(commentId) => {
    const form = new FormData()
    form.append('commentId', commentId)
    const response = await Comments.delete(form)
    return response.json()
  }
)

export const editComment = createAsyncThunk(
  'comments/editComment',
  async(commentId, commentText) => {
    const form = new FormData()
    form.append('newsId', commentId)
    form.append('commentText', commentText)
    const response = await Comments.edit(form)
    return response.json()
  }
)

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

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

export default commentSlice.reducer