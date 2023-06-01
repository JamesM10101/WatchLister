import { useTheme } from "@emotion/react"
import { Alert, Avatar, Box, Card, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FlexBetween from "./FlexBetween"
import { Link } from "react-router-dom"
import { Bookmark, BookmarkBorder } from "@mui/icons-material"
import { setUser } from "../../state/state"

function SavedMovieCard({ movieId, token }) {
  const user = useSelector((state) => state.user)
  const palette = useTheme().palette
  const mode = palette.mode
  const dispatch = useDispatch()
  const [movie, setMovie] = useState({})
  const [isSaved, setIsSaved] = useState(user.savedMovies.includes(movieId))
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("")

  const getMovie = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/movies/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status === 200) {
        setMovie(await res.json())
      }
    })
  }

  useState(() => {
    getMovie()
  }, [])

  const toggleMovieSaved = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${movieId}/saveMovie`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          userId: user._id,
        },
      }
    ).then(async (res) => {
      if (res.status === 201) {
        dispatch(setUser({ user: await res.json() }))
        setSeverity("success")
        setAlertMsg(isSaved ? "Unsaved Movie" : "Saved Movie")
        setIsSaved(!isSaved)
      } else {
        setSeverity("error")
        setAlertMsg("Could not " + isSaved ? "Remove Movie" : "Save Movie")
      }
    })
  }

  return Object.keys(movie).length === 0 ? (
    <></>
  ) : (
    <Card width="100%">
      <FlexBetween
        sx={{
          padding: ".5rem",
          borderRadius: ".5rem",
          backgroundColor: palette.background.alt,
        }}
      >
        {/* Movie Poster & Title */}
        <Link to={`/movie/${movie._id}`} style={{ textDecoration: "none" }}>
          <Box
            display="flex"
            flexDirection="row"
            position="relative"
            gap=".5rem"
            alignItems="start"
          >
            {/* Poster */}
            {movie.posterPath !== "undefined" ? (
              <Avatar
                variant="rounded"
                alt={`${movie.title} poster`}
                sx={{ bgcolor: palette.neutral.dark, width: 48, height: 68 }}
                src={`${movie.posterPath}`}
              />
            ) : (
              <Avatar
                alt={`${movie.title} poster`}
                variant="rounded"
                sx={{ bgcolor: palette.neutral.dark, width: 48, height: 68 }}
              >
                {movie.title ? movie.title[0] : ""}
              </Avatar>
            )}

            <div>
              {/* Title */}
              <Typography
                fontSize="1.2rem"
                color={mode === "dark" ? "white" : "black"}
                fontWeight="bold"
              >
                {movie.title ? movie.title : "ERROR"}
              </Typography>

              <Typography
                fontSize=".8rem"
                color={mode === "dark" ? "white" : "black"}
                sx={{
                  width: "80%",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {movie.shortPlot ? movie.shortPlot : ""}
              </Typography>
            </div>
          </Box>
        </Link>

        {/* Save Button */}
        <IconButton
          onClick={() => {
            toggleMovieSaved()
          }}
        >
          {isSaved ? (
            <Bookmark sx={{ color: "#FFD700", width: 32, height: 32 }} />
          ) : (
            <BookmarkBorder
              sx={{
                color: mode === "dark" ? "" : "black",
                width: 32,
                height: 32,
              }}
            />
          )}
        </IconButton>
      </FlexBetween>

      {severity && (
        <Alert severity={severity}>
          <Typography>{alertMsg}</Typography>
        </Alert>
      )}
    </Card>
  )
}

export default SavedMovieCard
