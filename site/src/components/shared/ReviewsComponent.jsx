import React, { useState } from "react"
import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import UserReviewCard from "./UserReviewCard"

function ReviewsComponent({ reviews = [], type = "movie" }) {
  const [reviewCount, setReviewCount] = useState(5)
  const token = useSelector((state) => state.token)

  if (reviews === null) {
    reviews = []
  }

  return reviews.length !== 0 ? (
    reviews.map((reviewId, i) =>
      i < reviewCount ? (
        <Box margin="auto" marginTop=".5rem">
          <UserReviewCard reviewId={reviewId} token={token} />
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
