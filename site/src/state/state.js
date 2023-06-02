import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "light",
  user: null,
  token: null,
  needAuthForm: false,
  movies: [],
  searchQuery: null,
  searchResult: {},
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
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
    setMovies: (state, action) => {
      state.movies = action.payload.movies
    },
    setMovie: (state, action) => {
      const updatedMovies = state.movies
      updatedMovies[action.payload.movie._id] = action.payload.movie
      state.movies = updatedMovies
    },
    setSearch: (state, action) => {
      console.log(action.payload)
      state.searchQuery = action.payload.searchQuery
      state.searchResult = action.payload.searchResult
    },
    // setReviews: (state, action) => {
    //   state.reviews = action.payload.reviews
    // },
    // setReview: (state, action) => {
    //   const updatedReviews = state.reviews
    //   updatedReviews[action.payload.review._id] = action.payload.review
    //   state.reviews = updatedReviews
    // },
  },
})

export const {
  setUser,
  setMode,
  setNeedAuthForm,
  setLogin,
  setLogout,
  setMovies,
  setMovie,
  setSearch,
  // setReviews,
  // setReview,
} = authSlice.actions
export default authSlice.reducer
