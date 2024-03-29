import {
  Bookmark,
  BookmarkBorder,
  Circle,
  ExpandMore,
  ImageNotSupported,
  Star,
} from "@mui/icons-material"
import { Box, Chip, IconButton, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import FlexBetween from "../components/shared/FlexBetween.jsx"
import CreateReviewCard from "../components/shared/CreateReviewCard.jsx"
import BrokenMoviePage from "../components/BrokenMovie.jsx"
import { setNeedAuthForm, setUser } from "../state/state.js"
import MovieStaff from "../components/MovieStaff.jsx"
import ReviewsComponent from "../components/shared/ReviewsComponent.jsx"
import { getMovieById } from "../functions/Movies.js"
import { toggleSaveMovie } from "../functions/Users.js"
import { useTheme } from "@emotion/react"

function MoviePage() {
  const { movieId } = useParams()
  const dispatch = useDispatch()
  const state = useLocation().state
  const token = useSelector((state) => state.token)
  const isFullSizeScreen = useMediaQuery("(min-width: 1000px)")
  const palette = useTheme().palette

  const [movie, setMovie] = useState({})
  const [isSaved, setIsSaved] = useState(false)
  const [isStaffVis, setIsStaffVis] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isPageBroken, setIsPageBroken] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      if (user.savedMovies.includes(movieId)) setIsSaved(true)
    }

    // get the movie from backend
    const getMovie = async () => {
      const res = await getMovieById(movieId)

      if (res.status === 200) {
        const movie = await res.json()
        setMovie(movie)
        document.title = `WatchLister | ${movie.title}`
      } else {
        setIsPageBroken(true)
        document.title = `WatchLister | Error`
      }
      setIsPageLoading(false)
    }

    // check the movie was passed in
    if (state) {
      document.title = state.movie.title
      setMovie(state.movie)
      setIsPageLoading(false)
    } else {
      getMovie()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMovieSaved = async () => {
    const res = await toggleSaveMovie(user._id, token, movieId)

    if (res.status === 201) {
      dispatch(setUser({ user: await res.json() }))
      setIsSaved(!isSaved)
    } else {
    }
  }

  return isPageLoading ? (
    <></>
  ) : isPageBroken ? (
    <BrokenMoviePage />
  ) : (
    <Box w="100%" h="100%">
      {/* Background Image */}
      <img
        width={"100%"}
        height="100%"
        alt=""
        src={movie.posterPath}
        draggable="false"
        style={{
          marginTop: "-1rem",
          position: "absolute",
          zIndex: -100,
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,1), 85%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Add Background Gradient*/}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        marginTop="-1rem"
        sx={{
          zIndex: -99,
          boxShadow: "inset 0 0 0 99999px rgba(0,0,0,.7)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,1), 85%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Movie Information */}
      <Box
        paddingTop="1rem"
        width="100%"
        height="100%"
        minHeight="100vh"
        sx={{ backdropFilter: "blur(2rem)" }}
      >
        <Box
          width={isFullSizeScreen ? "65%" : "90%"}
          height="auto"
          margin="auto"
          marginTop="1rem"
          sx={{ zIndex: 10 }}
        >
          {/* Movie Title */}
          <FlexBetween>
            <Typography
              variant="h1"
              fontWeight="bold"
              color="white"
              sx={{
                wordWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {movie.title ? movie.title : ""}
            </Typography>

            <IconButton
              aria-label={isSaved ? "Unsave Movie" : "Save Movie"}
              onClick={() => {
                if (user) {
                  toggleMovieSaved()
                } else {
                  dispatch(setNeedAuthForm())
                }
              }}
            >
              {isSaved ? (
                <Bookmark sx={{ color: "#FFD700", width: 36, height: 36 }} />
              ) : (
                <BookmarkBorder
                  sx={{
                    color: "white",
                    width: 36,
                    height: 36,
                  }}
                />
              )}
            </IconButton>
          </FlexBetween>

          {/* Movie Details */}
          <Box
            marginTop=".2rem"
            display="flex"
            flexDirection="row"
            color="white"
          >
            {movie.runtime
              ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
              : "0h"}
            <Circle sx={{ scale: ".2" }} />
            {movie.mpaRating ? movie.mpaRating : "MPA Rating"}
            <Circle sx={{ scale: ".2" }} />
            {movie.releaseDate
              ? movie.releaseDate.substring(0, 4)
              : "Release Date"}
          </Box>

          {/* Poster & Trailer */}
          <Box marginTop=".3rem" gap=".4rem" display="flex" alignItems="center">
            {!movie.posterPath.includes("null") ? (
              <img
                src={movie.posterPath}
                width={"26.2%"}
                draggable="false"
                style={{ zIndex: 2 }}
                alt={`${movie.title} poster`}
              />
            ) : (
              <ImageNotSupported
                sx={{
                  width: "26.2%",
                  height: "100%",
                  alt: movie.title,
                  color: palette.mode !== "dark" ? "black" : "white",
                }}
              />
            )}
            <div
              style={{
                width: "70%",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  style={{ display: "block", zIndex: 5 }}
                  width={"100%"}
                  height={"auto"}
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f2/16x9_Transparent.png"
                />
                <iframe
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    border: "none",
                  }}
                  allowFullScreen={true}
                  title={`${movie.title + " trailer"}`}
                  src={movie.trailer ? `https://${movie.trailer}` : ""}
                />
              </div>
            </div>
          </Box>

          {/* Genre Chips -- todo: this could go to genre page*/}
          <Box marginTop=".7rem">
            {movie.genres
              ? movie.genres.map((genre) => (
                  <Chip
                    label={genre}
                    color="primary"
                    variant="outlined"
                    sx={{
                      marginRight: ".3rem",
                      marginTop: ".3rem",
                      zIndex: 0,
                    }}
                  />
                ))
              : ""}
          </Box>

          {/* Description */}
          <Box marginTop=".9rem">
            <Typography lineHeight="1.5rem" variant="h5" color="white">
              {movie.shortPlot
                ? movie.shortPlot
                : "Could not get movie description"}
            </Typography>
          </Box>

          {/* Rating */}
          <FlexBetween mt="1rem">
            <Typography
              ml=".3rem"
              color="white"
              sx={{
                position: "relative",
                gap: ".4rem",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Star
                sx={{ marginBottom: ".2rem", scale: "1.2", color: "#FFD700" }}
              />
              <Typography
                marginLeft=".1rem"
                fontSize={movie.rating ? "1.2rem" : "1rem"}
              >
                {movie.rating ? (
                  <Box
                    marginTop=".2rem"
                    display="flex"
                    flexDirection="row"
                    color="white"
                  >
                    <Typography variant="h5">{movie.rating + "/5"}</Typography>
                    <Circle sx={{ scale: ".2" }} />
                    <Typography variant="h5">
                      {movie.reviews ? `${movie.reviews.length} Review(s)` : ""}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="h5">Unrated</Typography>
                )}
              </Typography>
            </Typography>

            {/* Expand Staff */}
            <Typography
              onClick={() => setIsStaffVis(!isStaffVis)}
              fontSize="1rem"
              display="flex"
              flexDirection="row"
              alignItems="center"
              overflow="clip"
              color="white"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Staff <ExpandMore />
            </Typography>
          </FlexBetween>

          {/* Staff */}
          {isStaffVis && (
            <MovieStaff
              actors={movie.actors}
              writers={movie.writers}
              directors={movie.directors}
            />
          )}

          {/* Review Header */}
          <Box marginTop="1.5rem" fontSize="1rem">
            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
              sx={{ textDecoration: "underline" }}
            >
              Reviews
            </Typography>
          </Box>

          {/* Write Review Text Input */}
          {movie._id && <CreateReviewCard movieId={movie._id} />}
        </Box>
        <Box
          width={isFullSizeScreen ? "65%" : "90%"}
          margin="auto"
          marginTop="1rem"
          paddingBottom=".5rem"
        >
          <ReviewsComponent
            reviews={[...movie.reviews].reverse()}
            movieId={movie._id}
            type="movie"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default MoviePage
