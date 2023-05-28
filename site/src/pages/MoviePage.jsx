import { Circle, ExpandMore, Star } from "@mui/icons-material"
import { Box, Chip, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import FlexBetween from "../components/shared/FlexBetween.jsx"
import CreateReviewCard from "../components/shared/CreateReviewCard.jsx"
import MovieReviewCard from "../components/shared/MovieReviewCard.jsx"

function MoviePage(props) {
  const { movieId } = useParams()
  const state = useLocation().state
  const token = useSelector((state) => state.token)
  const isFullSizeScreen = useMediaQuery("(min-width: 1000px)")

  const [movie, setMovie] = useState({})
  const [isStaffVis, setIsStaffVis] = useState(false)
  const [reviewCount, setReviewCount] = useState(5)

  useEffect(() => {
    // get the movie from backend
    const getMovie = async () => {
      await fetch(`http://localhost:3001/movies/${movieId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.status === 200) {
          setMovie(await res.json())
        } else {
          // todo -- indicate page broken
        }
      })
    }

    // check the movie was passed in
    if (state) {
      setMovie(state.movie)
    } else {
      getMovie()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box w="100%" h="100%">
      {/* Background Image */}
      <img
        width={"100%"}
        height="100%"
        alt=""
        src={movie.imagePath}
        draggable="false"
        style={{
          position: "absolute",
          zIndex: -100,
        }}
      />

      {/* Blur Background Image w/ movie info*/}
      <Box
        position="absolute"
        width="100%"
        height={
          movie.reviews ? (movie.reviews.length ? "100%" : "auto") : "auto"
        }
        sx={{
          zIndex: -99,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(3rem)",
          WebkitBackdropFilter: "blur(3rem)",
        }}
      >
        {/* Movie Information */}
        <Box>
          <Box
            width={isFullSizeScreen ? "65%" : "90%"}
            height="auto"
            margin="auto"
            marginTop="1rem"
            sx={{ zIndex: 10 }}
          >
            {/* Movie Title */}
            <Box>
              <Typography variant="h1" fontWeight="bold" color="white">
                {movie.title ? movie.title : ""}
              </Typography>
            </Box>

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
            <Box marginTop=".3rem" gap=".4rem" display="flex">
              <img
                src={movie.imagePath}
                width={"30%"}
                style={{ zIndex: 2 }}
                alt={`${movie.title} poster`}
              />
              <div
                style={{
                  width: "80%",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    style={{ display: "block", zIndex: 5 }}
                    width={"100%"}
                    height={"auto"}
                    alt=""
                    src="https://placehold.it/16x9"
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
                    src={
                      movie.trailerId
                        ? `https://www.youtube.com/embed/${movie.trailerId}`
                        : "https://www.youtube.com/embed/dQw4w9WgXcQ"
                    }
                  />
                </div>
              </div>
            </Box>

            {/* Genre Chips -- todo: this could go to genre page*/}
            <Box marginTop=".7rem">
              {movie.genre
                ? movie.genre.map((genre) => (
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
                {movie.description
                  ? movie.description
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
                      <Typography variant="h5">
                        {movie.rating + "/10"}
                      </Typography>
                      <Circle sx={{ scale: ".2" }} />
                      <Typography variant="h5">
                        {movie.reviews ? movie.reviews.length : ""}
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
              <Box>
                {/* Directors */}
                <Box marginTop="1.5rem" display="flex" flexDirection="row">
                  <Typography variant="h5" fontWeight="bold" color="white">
                    Director(s)
                  </Typography>
                  <Box
                    marginLeft="3rem"
                    color="white"
                    display="flex"
                    flexDirection="row"
                    overflow="clip"
                  >
                    {movie.director
                      ? movie.director.map((director) => (
                          <Typography marginLeft=".2rem" variant="h5">
                            {director}
                          </Typography>
                        ))
                      : "Unknown"}
                  </Box>
                </Box>

                {/* Seperator */}
                <Box
                  width="100%"
                  marginTop=".5rem"
                  height=".5px"
                  sx={{ backgroundColor: "white" }}
                ></Box>

                {/* Actors */}
                <Box marginTop=".5rem" display="flex" flexDirection="row">
                  <Typography variant="h5" fontWeight="bold" color="white">
                    Actor(s)
                  </Typography>
                  <Box
                    marginLeft="3rem"
                    color="white"
                    display="flex"
                    flexDirection="row"
                    overflow="scroll"
                  >
                    {movie.actors
                      ? movie.actors.map((actor) => (
                          <Typography marginLeft="1.4rem" variant="h5">
                            {actor}
                          </Typography>
                        ))
                      : "Unknown"}
                  </Box>
                </Box>
              </Box>
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
            {movie.reviews ? (
              movie.reviews.map((reviewId, i) =>
                i < reviewCount ? (
                  <Box margin="auto" marginTop=".5rem">
                    <MovieReviewCard
                      movie={movie}
                      reviewId={reviewId}
                      token={token}
                    />
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
                    <Typography color="white" fontSize="1rem">
                      Show More
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )
              )
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MoviePage
