import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: [],
  show: false,
  status: 'initial'
}

export const newsModalSlice = createSlice({
  name: 'newsModal',
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload
      state.status = 'loaded'
      state.show = true
    },
    showModal: (state, action) => {
      state.show = action.payload
    },
  },
})

export const { setItem, showModal } = newsModalSlice.actions

export default newsModalSlice.reducer;