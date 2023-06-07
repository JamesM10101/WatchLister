import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { ImageNotSupported, Star } from "@mui/icons-material"
import { useTheme } from "@emotion/react"

function MovieCard({ movie }) {
  const palette = useTheme().palette

  return (
    <Box
      position={"relative"}
      height={"200px"}
      width={"140px"}
      sx={{
        userSelect: "none",
        "&:hover": { cursor: "pointer" },
      }}
    >
      <Link
        to={{
          pathname: `/movie/${movie._id}`,
          state: {
            movie: movie,
          },
        }}
      >
        {!movie.posterPath.includes("null") ? (
          <img
            height={"200px"}
            width={"140px"}
            alt={movie.title}
            draggable="false"
            src={movie.posterPath}
            style={{ borderRadius: ".5rem", objectFit: "cover" }}
          />
        ) : (
          <ImageNotSupported
            sx={{
              height: "200px",
              width: "140px",
              alt: movie.title,
              color: palette.mode !== "dark" ? "black" : "white",
            }}
          />
        )}

        <Box
          position="absolute"
          width="100%"
          height="30%"
          bottom={0}
          zIndex={10}
          borderRadius="0 0 .5rem .5rem"
          sx={{
            backgroundColor: "rgba(11, 11, 11, 0.30)",
            backdropFilter: "blur(.08rem)",
            WebkitBackdropFilter: "blur(.08rem)",
          }}
        >
          <Typography
            mt=".2rem"
            ml=".3rem"
            color="white"
            fontSize=".8rem"
            fontWeight="bold"
            noWrap={true}
          >
            {movie.title}
          </Typography>
          <Typography
            mt=".2rem"
            ml=".3rem"
            color={"white"}
            fontSize=".9rem"
            sx={{
              gap: ".1rem",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Star sx={{ scale: ".9" }} />
            {movie.rating ? movie.rating : "Unrated"}
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}

export default MovieCard
