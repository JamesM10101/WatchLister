import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "light",
  user: null,
  token: null,
  needAuthForm: false,
  needUpdateForm: false,
  searchQuery: null,
  searchResult: {},
  movies: {
    recentReleased: [],
    highestRated: [],
    recentAdded: [],
    random: [],
    fetchDate: null,
  },
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
      state.needAuthForm = !state.needAuthForm
    },
    setNeedUpdateForm: (state) => {
      state.needUpdateForm = state.needUpdateForm ? false : true
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setRandomMovies: (state, action) => {
      state.movies.random = action.payload.movies
    },
    setHighestRatedMovies: (state, action) => {
      state.movies.highestRated = action.payload.movies
    },
    setRecentlyAddedMovies: (state, action) => {
      state.movies.recentAdded = action.payload.movies
    },
    setRecentlyReleasedMovies: (state, action) => {
      state.movies.recentReleased = action.payload.movies
    },
    setMovieFetchDate: (state, action) => {
      state.movies.fetchDate = action.payload.date
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload.searchQuery
      state.searchResult = action.payload.searchResult
    },
  },
})

export const {
  setUser,
  setMode,
  setNeedAuthForm,
  setNeedUpdateForm,
  setLogin,
  setLogout,
  setRandomMovies,
  setHighestRatedMovies,
  setRecentlyAddedMovies,
  setRecentlyReleasedMovies,
  setMovieFetchDate,
  setSearch,
} = authSlice.actions
export default authSlice.reducer
