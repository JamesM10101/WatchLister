import { useTheme } from "@emotion/react"
import {
  Circle,
  Delete,
  Edit,
  StarOutline,
  ThumbDownAlt,
  ThumbDownAltOutlined,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material"
import { Alert, Avatar, Box, Card, IconButton, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FlexBetween from "./FlexBetween"
import CreateReviewCard from "../shared/CreateReviewCard.jsx"
import { setNeedAuthForm } from "../../state/state.js"
import { Link } from "react-router-dom"
import {
  deleteReviewById,
  getReviewById,
  toggleLikeDislikeById,
} from "../../functions/Reviews"

function MovieReviewCard({ movieId, reviewId, token }) {
  const dispatch = useDispatch()
  const [review, setReview] = useState({})
  const [reviewer, setReviewer] = useState({})
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [isReviewEdit, setIsReviewEdit] = useState(false)
  const user = useSelector((state) => state.user)
  const palette = useTheme().palette

  const getReview = async () => {
    const res = await getReviewById(reviewId)
    const parsedRes = await res.json()

    if (res.status === 200) {
      setReview(parsedRes)
      getReviewer(parsedRes.userId)
      if (user && parsedRes) {
        setIsLiked(parsedRes.likes[user._id])
        setIsDisliked(parsedRes.dislikes[user._id])
      }
    }
  }

  const getReviewer = async (userId) => {
    await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status === 200) {
        setReviewer(await res.json())
      }
    })
  }

  useEffect(() => {
    getReview()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleLikeDislike = async (requestType) => {
    const res = await toggleLikeDislikeById(
      user._id,
      token,
      reviewId,
      requestType
    )

    if (res.status === 200) {
      const updatedReview = await res.json()
      setReview(updatedReview)
      setIsLiked(updatedReview.likes[user._id])
      setIsDisliked(updatedReview.dislikes[user._id])
    }
  }

  const deleteReview = async () => {
    const res = await deleteReviewById(user._id, token, reviewId)

    if (res.status === 200) {
      setSeverity("success")
      setAlertMsg("Review Deleted")
    } else {
      setSeverity("error")
      setAlertMsg("Could Not Delete")
    }
  }

  const alertDeletion = () => {
    const shouldDelete = window.confirm(
      "Are you sure you would like to delete this post?"
    )
    if (shouldDelete) deleteReview()
  }

  return isReviewEdit ? (
    <CreateReviewCard
      movieId={movieId}
      reviewId={review._id}
      pTitle={review.title}
      pReview={review.description}
      pRating={review.rating}
      edit={true}
      setIsReviewEdit={setIsReviewEdit}
      setReviewForMovie={setReview}
    />
  ) : review && review !== {} && reviewer !== {} ? (
    <Card
      width="100%"
      sx={{
        borderRadius: ".5rem",
        backgroundColor: palette.background.alt,
      }}
    >
      <FlexBetween margin=".5rem" marginBottom="0rem">
        {/* User Profile & Name */}
        <Link
          to={`/profile/${reviewer._id}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            position="relative"
            gap=".5rem"
            alignItems="center"
          >
            {/* Profile */}
            {reviewer.picturePath !== "undefined" ? (
              <Avatar
                alt="profile"
                sx={{ bgcolor: palette.neutral.dark, scale: ".9" }}
                src={`${process.env.REACT_APP_BACKEND_ADDRESS}/userImages/${reviewer.picturePath}`}
              />
            ) : (
              <Avatar
                alt="profile"
                sx={{ bgcolor: palette.neutral.dark, scale: ".9" }}
              >
                {reviewer.username ? reviewer.username[0] : ""}
              </Avatar>
            )}

            {/* Name */}
            <Typography fontSize="1rem" color={palette.neutral.dark}>
              {reviewer.username ? reviewer.username : "Anonymous"}
            </Typography>
          </Box>
        </Link>

        {/* Rating */}
        <Card
          sx={{
            padding: ".2rem",
            paddingBottom: "0rem",
            paddingTop: "0rem",
            backgroundColor: "#FFD700",
          }}
        >
          <Typography
            sx={{
              position: "relative",
              gap: ".2rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <StarOutline
              sx={{
                marginBottom: ".1rem",
                scale: "1.1",
                color: "black",
              }}
            />
            <Typography fontSize="1.1rem" color="black">
              {review.rating ? review.rating : "0"}
            </Typography>
          </Typography>
        </Card>
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
      <FlexBetween>
        <Box
          margin=".5rem"
          marginBottom=".1rem"
          display="flex"
          flexDirection="row"
        >
          {/* Like */}
          <Box
            onClick={() => {
              if (user) {
                toggleLikeDislike("like")
              } else {
                dispatch(setNeedAuthForm())
              }
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
              if (user) {
                toggleLikeDislike("dislike")
              } else {
                dispatch(setNeedAuthForm())
              }
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

        <div>
          {/* Delete & Edit Buttons */}
          {user
            ? review.userId === user._id && (
                <>
                  <IconButton onClick={alertDeletion}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => setIsReviewEdit(true)}>
                    <Edit />
                  </IconButton>
                </>
              )
            : ""}
        </div>
      </FlexBetween>

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
