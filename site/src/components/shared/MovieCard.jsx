import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { Star } from "@mui/icons-material"
import noImage from "../../resources/noImage.png"

function MovieCard({ movie }) {
  return (
    <Box
      position={"relative"}
      width={"130px"}
      sx={{
        userSelect: "none",
      }}
    >
      <Link to={`movie/${movie._id}`}>
        <img
          width={"100%"}
          alt={movie.title}
          draggable="false"
          src={movie.imagePath ? movie.imagePath : noImage}
          style={{ borderRadius: ".5rem", objectFit: "fill" }}
        />
        <Box
          position="absolute"
          width="100%"
          height="30%"
          bottom={0}
          zIndex={10}
          borderRadius="0 0 .5rem .5rem"
          background="rgba(0, 0, 0, 0.62)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          sx={{
            backdropFilter: "blur(.15rem)",
            WebkitBackdropFilter: "blur(9.6px)",
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
