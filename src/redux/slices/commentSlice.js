import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comments, Reply } from '../../services/fetchAPI';
import { showErrorModal } from './errorSlice';
import { getNewsPopular } from './newsDataSlice';

const initialState = {
  commentData: [],
  status: 'idle'
}

export const getComments = createAsyncThunk(
  'comments/getComments',
  async(newsId, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const form = new FormData()
    form.append('newsId', newsId)
    const response = await Comments.getList(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const addComment = createAsyncThunk(
  'comments/addComment',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    form.append('commentText', arg.text)
    const response = await Comments.add(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      dispatch(getComments(arg.newsId))
      dispatch(getNewsPopular())
      return fulfillWithValue(res)
    })
  }
)

export const addReply = createAsyncThunk(
  'comments/addReply',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    form.append('replyText', arg.text)
    form.append('commentId', arg.commentId)
    const response = await Reply.add(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      dispatch(getComments(arg.newsId))
      return fulfillWithValue(res)
    })
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async(arg, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const form = new FormData()
    form.append('commentId', arg.commentId)
    const response = await Comments.delete(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      let newsId = getState().newsModal.item.id
      dispatch(getComments(newsId))
      dispatch(getNewsPopular())
      return fulfillWithValue(res)
    })
  }
)

export const deleteReply = createAsyncThunk(
  'comments/deleteReply',
  async(arg, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const form = new FormData()
    form.append('replyId', arg.replyId)
    const response = await Comments.deleteReply(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      let newsId = getState().newsModal.item.id
      dispatch(getComments(newsId))
      dispatch(getNewsPopular())
      return fulfillWithValue(res)
    })
  }
)

export const restoreComment = createAsyncThunk(
  'comments/restoreComment',
  async(arg, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const form = new FormData()
    form.append('commentId', arg.commentId)
    const response = await Comments.restore(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      let newsId = getState().newsModal.item.id
      dispatch(getComments(newsId))
      dispatch(getNewsPopular())
      return fulfillWithValue(res)
    })
  }
)

export const restoreReply = createAsyncThunk(
  'comments/restoreReply',
  async(arg, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const form = new FormData()
    form.append('replyId', arg.replyId)
    const response = await Comments.restoreReply(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      let newsId = getState().newsModal.item.id
      dispatch(getComments(newsId))
      dispatch(getNewsPopular())
      return fulfillWithValue(res)
    })
  }
)

export const editComment = createAsyncThunk(
  'comments/editComment',
  async(arg, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const form = new FormData()
    form.append('commentId', arg.commentId)
    form.append('commentText', arg.text)
    const response = await Comments.edit(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      let newsId = getState().newsModal.item.id
      dispatch(getComments(newsId))
      return fulfillWithValue(res)
    })
  }
)

export const editReply = createAsyncThunk(
  'comment/editReply',
  async(arg, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const form = new FormData()
    form.append('replyId', arg.replyId)
    form.append('replyText', arg.text)
    const response = await Comments.editReply(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      let newsId = getState().newsModal.item.id
      dispatch(getComments(newsId))
      return fulfillWithValue(res)
    })
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
      state.commentData = action.payload.data
    })
  }
})

export const { unloadComments } = commentSlice.actions;

export default commentSlice.reducer