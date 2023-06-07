import React, { useState } from "react"
import { Box, IconButton } from "@mui/material"
import { useSelector } from "react-redux"
import UserReviewCard from "./UserReviewCard"
import MovieReviewCard from "./MovieReviewCard"
import { ArrowDownward } from "@mui/icons-material"
import { useTheme } from "@emotion/react"

function ReviewsComponent({ reviews = [], type, movieId }) {
  const [reviewCount, setReviewCount] = useState(5)
  const token = useSelector((state) => state.token)
  const palette = useTheme().palette

  if (reviews === null) {
    reviews = []
  }

  return reviews.length !== 0 ? (
    reviews.map((reviewId, i) =>
      i < reviewCount ? (
        <Box margin="auto" marginTop=".5rem">
          {type === "movie" ? (
            <MovieReviewCard
              movieId={movieId}
              reviewId={reviewId}
              token={token}
            />
          ) : (
            <UserReviewCard reviewId={reviewId} token={token} key={reviewId} />
          )}
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

export default ReviewsComponent
