import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMovies } from "../state/state"
import { Box } from "@mui/material"
import MovieCarousel from "../components/shared/MovieCarousel"

const HomePage = () => {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movies)
  const token = useSelector((state) => state.token)

  // get 10 movies
  const getMovies = async () => {
    const movieIds = [
      "646da3d1990e5d5dc6919eb8",
      "646da3d1990e5d5dc6919ebb",
      "646da3d2990e5d5dc6919ebe",
      "646da3d2990e5d5dc6919ec1",
      "646da3d2990e5d5dc6919ec4",
      "646da3d2990e5d5dc6919ec7",
      "646da3d2990e5d5dc6919eca",
      "646da3d2990e5d5dc6919ecd",
      "646da3d3990e5d5dc6919ed0",
      "646da3d3990e5d5dc6919ed3",
    ]

    let movies = []

    for (let id of movieIds) {
      await fetch(`http://localhost:3001/movies/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(async (res) => movies.push(await res.json()))
    }

    dispatch(setMovies({ movies: movies }))
  }

  useEffect(() => {
    getMovies()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box marginTop={"1rem"} display="flex" flexDirection="column">
        <MovieCarousel movies={movies} />
      </Box>
    </Box>
  )
}

export default HomePage
