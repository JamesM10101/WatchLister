import React, { useState } from "react"
import { Box, IconButton } from "@mui/material"
import { useSelector } from "react-redux"
import SavedMovieCard from "./SavedMovieCard"
import { ArrowDownward } from "@mui/icons-material"
import { useTheme } from "@emotion/react"

function SavedMoviesComponent({ movies = [] }) {
  const [reviewCount, setReviewCount] = useState(5)
  const token = useSelector((state) => state.token)
  const palette = useTheme().palette

  if (movies === null) {
    movies = []
  }

  return movies.length !== 0 ? (
    movies.map((movieId, i) =>
      i < reviewCount ? (
        <Box margin="auto" marginTop=".5rem">
          <SavedMovieCard movieId={movieId} token={token} />
        </Box>
      ) : i === reviewCount ? (
        <Box width="100%" textAlign="center">
          <IconButton
            sx={{
              backgroundColor: palette.background.alt,
              margin: "auto",
              marginTop: ".5rem",
            }}
            onClick={() => setReviewCount(reviewCount + 5)}
          >
            <ArrowDownward />
          </IconButton>
        </Box>
      ) : (
        <></>
      )
    )
  ) : (
    <></>
  )
}

export default SavedMoviesComponent
