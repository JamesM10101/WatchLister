import { useSelector } from "react-redux"
import MovieCard from "../components/shared/MovieCard"

function HomePage() {
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
      const movie = await fetch(`http://localhost:5001/movies/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => movies.push(res.body))
    }

    console.log(movies)

    return movies
  }

  return getMovies().array.forEach((movie) => (
    <MovieCard movie={movie}></MovieCard>
  ))
}

export default HomePage
