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
      "6478f174ab01369ed81fffae",
      "64791566ab01369ed821092e",
      "647916b9ab01369ed82112b6",
      "64791698ab01369ed82111c2",
      "64790a4fab01369ed820bbe7",
      "647908c9ab01369ed820b1c0",
      "6478f336ab01369ed8200da1",
      "6478f200ab01369ed8200424",
      "6478f210ab01369ed82004ac",
      "6478f178ab01369ed81fffd2",
    ]

    let movies = []

    for (let id of movieIds) {
      await fetch(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/getMovie/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => movies.push(await res.json()))
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
