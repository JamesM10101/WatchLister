import { useTheme } from "@emotion/react"
import {
  Circle,
  Delete,
  Edit,
  Star,
  ThumbDownAlt,
  ThumbDownAltOutlined,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material"
import { Alert, Box, Card, IconButton, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlexBetween from "./FlexBetween"
import CreateReviewCard from "../shared/CreateReviewCard.jsx"

function MovieReviewCard({ movie, reviewId, token }) {
  const [review, setReview] = useState({})
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [isReviewEdit, setIsReviewEdit] = useState(false)
  const user = useSelector((state) => state.user)
  const palette = useTheme().palette

  const getReview = async () => {
    await fetch(`http://localhost:3001/reviews/${reviewId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status == 200) {
        const result = await res.json()
        setReview(result)
        if (user && result) {
          setIsLiked(result.likes[user._id])
          setIsDisliked(result.dislikes[user._id])
        }
      }
    })
  }

  useEffect(() => {
    getReview()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleLikeDislike = async (requestType) => {
    await fetch(`http://localhost:3001/reviews/${reviewId}/${requestType}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: user._id,
      },
    }).then(async (res) => {
      if (res.status == 200) {
        const updatedReview = await res.json()
        setReview(updatedReview)
        setIsLiked(updatedReview.likes[user._id])
        setIsDisliked(updatedReview.dislikes[user._id])
      }
    })
  }

  const deleteReview = async () => {
    await fetch(`http://localhost:3001/reviews/${reviewId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: user._id,
      },
    }).then(async (res) => {
      if (res.status == 200) {
        setSeverity("success")
        setAlertMsg("Review Deleted")
      } else {
        setSeverity("error")
        setAlertMsg("Could Not Delete")
      }
    })
  }

  const alertDeletion = () => {
    const shouldDelete = window.confirm(
      "Are you sure you would like to delete this post?"
    )
    if (shouldDelete) deleteReview()
  }

  return isReviewEdit ? (
    <CreateReviewCard
      movieId={movie._id}
      reviewId={review._id}
      pTitle={review.title}
      pReview={review.description}
      pRating={review.rating}
      edit={true}
      setIsReviewEdit={setIsReviewEdit}
      setReviewForMovie={setReview}
    />
  ) : review ? (
    <Card
      width="100%"
      sx={{
        borderRadius: ".5rem",
        backgroundColor: palette.background.alt,
      }}
    >
      <FlexBetween>
        {/* Review Score */}
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
            {review.rating ? review.rating + "/5" : "-/5"}
          </Typography>
        </Typography>

        <Box>
          {/* Delete Button */}
          {user
            ? review.userId === user._id && (
                <IconButton onClick={alertDeletion}>
                  <Delete />
                </IconButton>
              )
            : ""}

          {/* Edit Button */}
          {user
            ? review.userId === user._id && (
                <IconButton onClick={() => setIsReviewEdit(true)}>
                  <Edit />
                </IconButton>
              )
            : ""}
        </Box>
      </FlexBetween>

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
        {review.title ? review.title : ""}
      </Typography>

      {/* Review Description */}
      <Typography
        onClick={() => setShowFullDesc(!showFullDesc)}
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
        {review.description ? review.description : ""}
      </Typography>

      {/* Like/Dislike */}
      <Box
        margin=".5rem"
        marginBottom=".1rem"
        display="flex"
        flexDirection="row"
      >
        {/* Like */}
        <Box
          onClick={() => {
            toggleLikeDislike("like")
          }}
          paddingRight=".5rem"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {user ? (
            isLiked ? (
              <ThumbUpAlt />
            ) : (
              <ThumbUpAltOutlined />
            )
          ) : (
            <ThumbUpAltOutlined />
          )}
        </Box>

        <Typography>
          {review.likes
            ? Object.keys(review.likes).length
              ? Object.keys(review.likes).length
              : 0
            : 0}
        </Typography>

        <Circle sx={{ scale: ".2" }} />

        {/* Dislike */}
        <Box
          onClick={() => {
            toggleLikeDislike("dislike")
          }}
          paddingRight=".5rem"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {user ? (
            isDisliked ? (
              <ThumbDownAlt />
            ) : (
              <ThumbDownAltOutlined />
            )
          ) : (
            <ThumbDownAltOutlined />
          )}
        </Box>

        <Typography>
          {review.dislikes
            ? Object.keys(review.dislikes).length
              ? Object.keys(review.dislikes).length
              : 0
            : 0}
        </Typography>
      </Box>

      {severity && (
        <Alert severity={severity}>
          <Typography>{alertMsg}</Typography>
        </Alert>
      )}
    </Card>
  ) : (
    <></>
  )
}

export default MovieReviewCard
