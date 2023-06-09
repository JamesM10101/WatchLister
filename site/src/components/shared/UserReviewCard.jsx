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
import { setNeedAuthForm, setUser } from "../../state/state.js"
import { Link } from "react-router-dom"
import { getMovieById } from "../../functions/Movies"
import {
  deleteReviewById,
  getReviewById,
  toggleLikeDislikeById,
} from "../../functions/Reviews"

function UserReviewCard({ reviewId, token }) {
  const dispatch = useDispatch()
  const [movie, setMovie] = useState({})
  const [review, setReview] = useState({})
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [isReviewEdit, setIsReviewEdit] = useState(false)
  const user = useSelector((state) => state.user)
  const palette = useTheme().palette
  const mode = palette.mode

  const getReview = async () => {
    const res = await getReviewById(reviewId)
    const parsedRes = await res.json()

    if (res.status === 200) {
      setReview(parsedRes)
      getMovie(parsedRes.movieId)
      if (user && parsedRes) {
        setIsLiked(parsedRes.likes[user._id])
        setIsDisliked(parsedRes.dislikes[user._id])
      }
    }
  }

  const getMovie = async (movieId) => {
    const res = await getMovieById(movieId)

    if (res.status === 200) {
      setMovie(await res.json())
    }
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
      const parsedRes = await res.json()

      // update the like status
      const updatedReview = parsedRes.review
      setReview(updatedReview)
      console.log(updatedReview)
      setIsLiked(updatedReview.likes[user._id])
      setIsDisliked(updatedReview.dislikes[user._id])

      // update the user
      dispatch(setUser({ user: parsedRes.user }))
    }
  }

  const deleteReview = async () => {
    const res = await deleteReviewById(user._id, token, reviewId)
    const parsed = await res.json()
    if (res.status === 200) {
      setSeverity("success")
      setAlertMsg("Review Deleted")
      dispatch(setUser({ user: parsed.user }))
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
      movieId={movie._id}
      reviewId={review._id}
      pTitle={review.title}
      pReview={review.description}
      pRating={review.rating}
      edit={true}
      setIsReviewEdit={setIsReviewEdit}
      setReviewForMovie={setReview}
    />
  ) : review && review !== {} && movie !== {} ? (
    <Card
      width="100%"
      sx={{
        borderRadius: ".5rem",
        backgroundColor: palette.background.alt,
      }}
    >
      <FlexBetween margin=".5rem" marginBottom="0rem">
        {/* Movie Poster & Title */}
        <Link to={`/movie/${movie._id}`} style={{ textDecoration: "none" }}>
          <Box
            display="flex"
            flexDirection="row"
            position="relative"
            gap=".5rem"
            alignItems="center"
          >
            {/* Poster */}
            {movie.posterPath !== "undefined" ? (
              <Avatar
                variant="rounded"
                alt={`${movie.title} poster`}
                sx={{ bgcolor: palette.neutral.dark, scale: ".9" }}
                src={`${movie.posterPath}`}
              />
            ) : (
              <Avatar
                alt={`${movie.title} poster`}
                variant="rounded"
                sx={{ bgcolor: palette.neutral.dark, scale: ".9" }}
              >
                {movie.title ? movie.title[0] : ""}
              </Avatar>
            )}

            {/* Title */}
            <Typography
              fontSize="1.1rem"
              color={mode === "dark" ? "white" : "black"}
            >
              {movie.title ? movie.title : "ERROR"}
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
                  <IconButton aria-label="Delete" onClick={alertDeletion}>
                    <Delete />
                  </IconButton>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => setIsReviewEdit(true)}
                  >
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

export default UserReviewCard
