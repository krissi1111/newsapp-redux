import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth, Favorite } from '../../services/fetchAPI';
import { showErrorModal } from './errorSlice';


const initialState = {
  user: {
    id: -1,
    username: 'Guest',
    firstName: 'Guest',
    lastName: 'Guest',
    userType: 'Guest'
  },
  userFavs: [],
  favChecked: false,
  loggedIn: false,
  showModal: false,
  showUserModal: false
}

export const loginToken = createAsyncThunk(
  'auth/loginToken',
  async(arg, { rejectWithValue, fulfillWithValue }) => {
    const response = await Auth.status()
    if(response.status !== 200) {
      return response.json().then(res => {
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const loginForm = createAsyncThunk(
  'auth/loginForm',
  async(user, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await Auth.login(user)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async(user, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await Auth.register(user)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => fulfillWithValue(res))
  }
)

export const favAddRemove = createAsyncThunk(
  'favorite/favAddRemove',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    const response = await Favorite.addRemove(form)
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      dispatch(getUserFavs())
      return fulfillWithValue(res)
    })
  }
)

export const getUserFavs = createAsyncThunk(
  'favorite/userFavs',
  async(arg, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await Favorite.userFavs()
    if(response.status !== 200) {
      return response.json().then(res => {
        dispatch(showErrorModal(res.message))
        return rejectWithValue(res)
      })
    }
    else return response.json().then(res => {
      return fulfillWithValue(res)
    })
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false
      state.user = []
      state.userFavs = []
      state.favChecked = false
      localStorage.removeItem('token')
    },
    showAuthModal: (state) => {
      state.showModal = !state.showModal
    },
    setShowUserModal: (state) => {
      state.showUserModal = !state.showUserModal
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginToken.fulfilled, (state, action) => {
      let res = action.payload
      state.loggedIn = true
      state.user = res.data.user
      localStorage.setItem('token', res.data.token)
    })
    .addCase(loginForm.fulfilled, (state, action) => {
      let res = action.payload
      state.loggedIn = true
      state.user = res.data.user
      localStorage.setItem('token', res.data.token)
    })
    .addCase(loginForm.rejected, (state, action) => {
      console.log(action.payload.message)
    })
    .addCase(register.fulfilled, (state, action) => {
      console.log("Success")
      console.log(action.payload)
    })
    .addCase(register.rejected, (state, action) => {
      console.log("Rejected")
      console.log(action.payload)
    })
    .addCase(getUserFavs.fulfilled, (state, action) => {
      state.favChecked = true
      let favs = action.payload.data
      let favIds = []
      favIds = favs.map(fav => fav.newsItemId)
      state.userFavs = favIds
    })
  }
})

export const selectLoggedIn = (state) => state.auth.loggedIn
export const selectFavChecked = (state) => state.auth.favChecked
export const selectUser = (state) => state.auth.user
export const selectUserFavs = (state) => state.auth.userFavs

export const { logout, showAuthModal, setShowUserModal } = authSlice.actions

export const selectAuth = (state) => state.auth

export default authSlice.reducer