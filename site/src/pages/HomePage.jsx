import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, useMediaQuery } from "@mui/material"
import {
  setHighestRatedMovies,
  setMovieFetchDate,
  setRandomMovies,
  setRecentlyAddedMovies,
  setRecentlyReleasedMovies,
} from "../state/state.js"
import MovieCarousel from "../components/shared/MovieCarousel"
import {
  getHighestRated,
  getRandom,
  getRecentlyAdded,
  getRecentlyReleased,
} from "../functions/Movies.js"

const HomePage = () => {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movies)
  const isFullSizeScreen = useMediaQuery("(min-width: 700px)")

  useEffect(() => {
    const getMovies = async () => {
      const highRes = await getHighestRated()
      dispatch(setHighestRatedMovies({ movies: await highRes.json() }))

      const recAddRes = await getRecentlyAdded()
      dispatch(setRecentlyAddedMovies({ movies: await recAddRes.json() }))

      const recRelRes = await getRecentlyReleased()
      dispatch(setRecentlyReleasedMovies({ movies: await recRelRes.json() }))
    }

    const getRandMovies = async () => {
      const res = await getRandom()
      dispatch(setRandomMovies({ movies: await res.json() }))
    }

    // get movies when state is null or is old data
    if (
      !movies.recentAdded.length ||
      movies.fetchDate !== new Date().toDateString()
    ) {
      getMovies()
      getRandMovies()
      dispatch(setMovieFetchDate({ date: new Date().toDateString() }))
    } else {
      getRandMovies()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box
        marginTop="1rem"
        display="flex"
        flexDirection="column"
        rowGap={isFullSizeScreen ? "2rem" : "1rem"}
        marginBottom="3rem"
      >
        <MovieCarousel
          movies={movies.highestRated}
          title="Highest Rated Movies"
        />
        <MovieCarousel
          movies={movies.recentAdded}
          title="Recently Added Movies"
        />
        <MovieCarousel
          movies={movies.recentReleased}
          title="Recently Released Movies"
        />
        <MovieCarousel movies={movies.random} title="Random Movies" />
      </Box>
    </Box>
  )
}

export default HomePage
