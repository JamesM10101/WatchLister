import {
  Alert,
  AlertTitle,
  Box,
  Card,
  IconButton,
  InputBase,
} from "@mui/material"
import React, { useState } from "react"
import FlexBetween from "./FlexBetween"
import { Send, Star } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setNeedAuthForm } from "../../state/state"
import { useTheme } from "@emotion/react"

function CreateReviewCard({ movieId }) {
  const palette = useTheme().palette
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
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

  // call backend create review function
  const createReview = async () => {
    await fetch(
      `http://localhost:${process.env.REACT_APP_SERVER_PORT}/reviews/${movieId}/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          userId: user._id,
        },
        body: JSON.stringify({
          title: reviewTitle,
          rating: rating,
          description: review,
        }),
      }
    ).then(async (result) => {
      const review = await result.json()
      if (result.status == 201) {
        // success -- clear fields
        setSeverity("success")
        setAlertMsg("Review Posted")
        setRating(0)
        setReview("")
        setReviewTitle("")
        document.getElementById("createReviewTitle").value = ""
        document.getElementById("createReviewBody").value = ""
      } else {
        setSeverity("error")
        setAlertMsg(result.error)
      }
    })
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
        ></InputBase>
        <IconButton
          onClick={() => {
            if (user) {
              createReview()
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
        <Alert
          severity={severity}
          sx={{
            backgroundColor: palette.background.alt,
          }}
        >
          {alertMsg}
        </Alert>
      )}
    </Card>
  )
}

export default CreateReviewCard
