import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "light",
  user: null,
  token: null,
  needAuthForm: false,
  reviews: {},
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setNeedAuthForm: (state) => {
      state.needAuthForm = state.needAuthForm ? false : true
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews
    },
    setReview: (state, action) => {
      const updatedReviews = state.reviews
      updatedReviews[action.payload.review._id] = action.payload.review
      state.reviews = updatedReviews
    },
  },
})

export const {
  setMode,
  setNeedAuthForm,
  setLogin,
  setLogout,
  setReviews,
  setReview,
} = authSlice.actions
export default authSlice.reducer
