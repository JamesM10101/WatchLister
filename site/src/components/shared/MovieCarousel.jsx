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
  const isFullSizeScreen = useMediaQuery("(min-width: 870px)")

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
      {isFullSizeScreen ? (
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
            aria-label="Previous"
            disabled={startIndex <= 0}
            sx={{
              backgroundColor: palette.background.alt,
            }}
            onClick={() => {
              setStartIndex(startIndex - 5)
              setEndIndex(endIndex - 5)
            }}
          >
            <ArrowBack />
          </IconButton>

          {/* Movies */}
          {movies.slice(startIndex, endIndex).map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}

          {/* Forward Button */}
          <IconButton
            aria-label="Next"
            disabled={endIndex >= movies.length}
            sx={{ backgroundColor: palette.background.alt }}
            onClick={() => {
              setStartIndex(startIndex + 5)
              setEndIndex(endIndex + 5)
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          gap=".5rem"
          sx={{
            overflowY: "hidden",
            overflowX: "scroll",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </Box>
      )}
    </div>
  )
}

export default MovieCarousel
