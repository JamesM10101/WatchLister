import { useState } from "react"
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import MovieCard from "./MovieCard"

function MovieCarousel({ movies, title }) {
  const palette = useTheme().palette

  // keep track of starting index, needed for screen resizing
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(5)
  const [startIndexMobile, setStartIndexMobile] = useState(0)
  const [endIndexMobile, setEndIndexMobile] = useState(3)
  const isFullSizeScreen = useMediaQuery("(min-width: 700px)")

  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          {title}
        </Typography>
      </div>
      <Box
        marginTop={isFullSizeScreen ? ".5rem" : "-.75rem"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        sx={{
          scale: isFullSizeScreen ? "1" : "0.8",
        }}
      >
        {/* Back Button */}
        <IconButton
          disabled={(isFullSizeScreen ? startIndex : startIndexMobile) <= 0}
          sx={{
            backgroundColor: palette.background.alt,
          }}
          onClick={() => {
            setStartIndex(startIndex - 5)
            setEndIndex(endIndex - 5)
            setStartIndexMobile(startIndexMobile - 3)
            setEndIndexMobile(endIndexMobile - 3)
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Movies */}
        {movies
          .slice(
            isFullSizeScreen ? startIndex : startIndexMobile,
            isFullSizeScreen ? endIndex : endIndexMobile
          )
          .map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}

        {/* Forward Button */}
        <IconButton
          disabled={
            (isFullSizeScreen ? endIndex : endIndexMobile) >= movies.length
          }
          sx={{ backgroundColor: palette.background.alt }}
          onClick={() => {
            setStartIndex(startIndex + 5)
            setEndIndex(endIndex + 5)
            setStartIndexMobile(startIndexMobile + 3)
            setEndIndexMobile(endIndexMobile + 3)
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </div>
  )
}

export default MovieCarousel
