import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  showModal: false,
  errorMessage: ""
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showErrorModal: (state, action) => {
      state.errorMessage = action.payload
      state.showModal = true
    },
    hideErrorModal: (state) => {
      state.showModal = false
    }
  }
})

export const { showErrorModal, hideErrorModal } = errorSlice.actions

export default errorSlice.reducer