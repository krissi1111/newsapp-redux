import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth } from '../../services/fetchAPI';


const initialState = {
  user: {
    username: 'Guest',
    firstName: 'Guest',
    lastName: 'Guest'
  },
  loggedIn: false,
  showModal: false
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false
      state.user = []
      localStorage.removeItem('token')
    },
    showAuthModal: (state) => {
      state.showModal = !state.showModal
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
  }
})

export const { logout, showAuthModal } = authSlice.actions

export const selectAuth = (state) => state.auth

export default authSlice.reducer