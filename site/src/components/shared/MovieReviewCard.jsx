import { useTheme } from "@emotion/react"
import { Star } from "@mui/icons-material"
import { Card, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

function MovieReviewCard({ reviewId, token }) {
  const [review, setReview] = useState({})
  const [showFullDesc, setShowFullDesc] = useState(false)
  const palette = useTheme().palette

  const getReview = async () => {
    await fetch(`http://localhost:3001/reviews/${reviewId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      setReview(await res.json())
    })
  }

  useEffect(() => {
    getReview()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      width="100%"
      sx={{
        borderRadius: ".5rem",
        backgroundColor: palette.background.alt,
      }}
    >
      <Typography
        padding=".5rem"
        paddingBottom="0rem"
        sx={{
          position: "relative",
          gap: ".2rem",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Star sx={{ marginBottom: ".2rem", scale: "1", color: "#FFD700" }} />
        <Typography marginLeft=".1rem" fontSize="1rem">
          {review.rating + "/10"}
        </Typography>
      </Typography>

      {/* Review Title */}
      <Typography
        marginTop=".2rem"
        fontSize="1rem"
        fontWeight="bold"
        sx={{
          paddingLeft: ".5rem",
          paddingRight: ".5rem",
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {review.title}
      </Typography>

      {/* Review Description */}
      <Typography
        onClick={() => setShowFullDesc(!showFullDesc)}
        paddingBottom=".3rem"
        paddingLeft=".5rem"
        paddingRight=".5rem"
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          wordWrap: "break-word",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: showFullDesc ? Infinity : 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {review.description}
      </Typography>
    </Card>
  )
}

export default MovieReviewCard
