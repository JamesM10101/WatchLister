import {
  Alert,
  Box,
  Card,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import FlexBetween from "./FlexBetween"
import { Send, Star } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setNeedAuthForm } from "../../state/state"
import { useTheme } from "@emotion/react"
import { createReview, editReview } from "../../functions/Reviews"

function CreateReviewCard({
  reviewId,
  movieId,
  pTitle = "",
  pReview = "",
  pRating = 0,
  edit = false,
  setIsReviewEdit,
  setReviewForMovie,
}) {
  const palette = useTheme().palette
  const [rating, setRating] = useState(pRating)
  const [review, setReview] = useState(pReview)
  const [reviewTitle, setReviewTitle] = useState(pTitle)
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  // track stars for movie rating
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        onClick={() => {
          if (rating === i + 1) setRating(0)
          else setRating(i + 1)
        }}
        sx={{ color: rating > i ? "#FFD700" : "" }}
      />
    )
  }

  // creates or edits review based on edit variable
  const handleReview = async () => {
    if (!reviewTitle) {
      setSeverity("error")
      setAlertMsg("Title Required")
      return
    }

    const reviewData = {
      title: reviewTitle,
      rating: rating,
      description: review,
    }

    const result = await (edit
      ? editReview(user._id, token, reviewId, reviewData)
      : createReview(user._id, token, movieId, reviewData))

    if (result.status === 201 || result.status === 200) {
      // success -- clear fields
      setSeverity("success")
      setAlertMsg("Review Posted")
      setRating(0)
      setReview("")
      setReviewTitle("")
      document.getElementById("createReviewTitle").value = ""
      document.getElementById("createReviewBody").value = ""

      if (edit) {
        setIsReviewEdit(false)
        setReviewForMovie(await result.json())
      }
    } else {
      setSeverity("error")
      setAlertMsg(result.error)
    }
  }

  return (
    <Card
      width="100%"
      raised
      sx={{
        borderRadius: ".5rem",
        marginTop: "1rem",
        backgroundColor: palette.background.alt,
      }}
    >
      {/* Title */}
      <InputBase
        id="createReviewTitle"
        onChange={(event) => {
          if (alertMsg === "Title Required") {
            setSeverity("")
            setAlertMsg("")
          }
          setReviewTitle(event.target.value)
        }}
        sx={{
          padding: ".5rem",
          paddingBottom: "0rem",
          width: "100%",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
        placeholder="Review Title"
        value={reviewTitle}
      ></InputBase>

      {/* Review Body & Send */}
      <FlexBetween>
        <InputBase
          id="createReviewBody"
          onChange={(event) => {
            setReview(event.target.value)
          }}
          multiline
          maxRows="5"
          sx={{ paddingLeft: ".5rem", paddingRight: ".5rem", width: "100%" }}
          placeholder="Write a Review..."
          value={review}
        ></InputBase>
        <IconButton
          onClick={() => {
            if (user) {
              handleReview()
            } else {
              dispatch(setNeedAuthForm())
            }
          }}
        >
          <Send />
        </IconButton>
      </FlexBetween>

      {/* Star Review */}
      <Box marginLeft=".3rem">{stars}</Box>

      {severity && (
        <Alert severity={severity}>
          <Typography>{alertMsg}</Typography>
        </Alert>
      )}
    </Card>
  )
}

export default CreateReviewCard
