import React, { useState } from "react"
import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import SavedMovieCard from "./SavedMovieCard"

function SavedMoviesComponent({ movies = [] }) {
  const [reviewCount, setReviewCount] = useState(5)
  const token = useSelector((state) => state.token)

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
        <Box
          onClick={() => {
            setReviewCount(reviewCount + 5)
          }}
          marginTop={".5rem"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography fontSize="1rem">Show More</Typography>
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
