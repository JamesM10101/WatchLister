import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { Star } from "@mui/icons-material"
import noImage from "../../resources/noImage.png"

function MovieCard({ movie }) {
  const navigate = useNavigate()

  return (
    <Box
      position={"relative"}
      height={"200px"}
      sx={{
        userSelect: "none",
        "&:hover": { cursor: "pointer" },
      }}
    >
      <Box
        onClick={() =>
          navigate(`movie/${movie._id}`, {
            state: {
              movie: movie,
            },
          })
        }
      >
        <img
          height={"200px"}
          alt={movie.title}
          draggable="false"
          src={movie.imagePath ? movie.imagePath : noImage}
          style={{ borderRadius: ".5rem", objectFit: "cover" }}
        />
        <Box
          position="absolute"
          width="100%"
          height="30%"
          bottom={0}
          zIndex={10}
          borderRadius="0 0 .5rem .5rem"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          sx={{
            backgroundColor: "rgba(11, 11, 11, 0.30)",
            backdropFilter: "blur(.08rem)",
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
      </Box>
    </Box>
  )
}

export default MovieCard
