import React, { useState } from "react"
import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import UserReviewCard from "./UserReviewCard"
import MovieReviewCard from "./MovieReviewCard"

function ReviewsComponent({ reviews = [], type, movieId }) {
  const [reviewCount, setReviewCount] = useState(5)
  const token = useSelector((state) => state.token)

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

export default ReviewsComponent
