import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth, Favorite } from '../../services/fetchAPI';


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
  async(arg, { rejectWithValue }) => {
    try {
      const response = await Auth.status()
      if (!response.ok) {
        return rejectWithValue(response.status)
    }
      return response.json()
    } catch(err) {
      console.log('doesnt work')
      return rejectWithValue(err.message)
    }
  }
)

export const loginForm = createAsyncThunk(
  'auth/loginForm',
  async(user) => {
    const response = await Auth.login(user)
    return response.json()
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async(user) => {
    const response = await Auth.register(user)
    return response.json()
  }
)

export const favAddRemove = createAsyncThunk(
  'favorite/favAddRemove',
  async(arg, { dispatch }) => {
    const form = new FormData()
    form.append('newsId', arg.newsId)
    await Favorite.addRemove(form)
    dispatch(getUserFavs())
  }
)

export const getUserFavs = createAsyncThunk(
  'favorite/userFavs',
  async() => {
    const response = await Favorite.userFavs()
    return response.json()
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
      state.loggedIn = true
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
    })
    .addCase(loginForm.fulfilled, (state, action) => {
      state.loggedIn = true
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
    })
    .addCase(getUserFavs.fulfilled, (state, action) => {
      state.favChecked = true
      let favs = action.payload
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