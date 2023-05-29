import Movie from "../models/Movie.js"
import User from "../models/User.js"

// create
export const createMovie = async (req, res) => {
  try {
    // get the user with its id
    const { userId } = req.body
    const {
      title,
      description,
      imagePath,
      releaseDate,
      runtime,
      mpaRating,
      genre,
      director,
      actors,
    } = req.body
    const user = await User.findById(userId)

    // check that the user is an admin
    if (!user.admin) return res.status(401).json({ error: "Unauthorized User" })

    // create and save the movie
    const formattedMovie = new Movie({
      title,
      description,
      imagePath,
      releaseDate,
      runtime,
      mpaRating,
      genre,
      director,
      actors,
    })
    const newMovie = await formattedMovie.save()

    // return the new movie
    res.status(201).json(newMovie)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// read
export const getAllMovies = async (req, res) => {
  try {
    // get all the movies
    const movies = await Movie.find()

    // return the movies
    res.status(200).json(movies)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getMovie = async (req, res) => {
  try {
    // movie id
    const { id } = req.params

    // get the movie
    const movie = await Movie.findById(id)

    // return the movies
    res.status(200).json(movie)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// update
export const updateMovieDetails = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.header("userId")
    const {
      title,
      description,
      imagePath,
      releaseDate,
      runtime,
      mpaRating,
      genre,
      director,
      actors,
    } = req.body

    // check user is an admin
    const user = await User.findById(userId)
    if (!user.admin) return res.status(401).json({ error: "Unauthorized User" })

    // update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        imagePath: imagePath,
        releaseDate: releaseDate,
        runtime: runtime,
        mpaRating: mpaRating,
        genre: genre,
        director: director,
        actors: actors,
      },
      { new: true }
    )

    // return the updated movie
    res.status(200).json(updatedMovie)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// delete
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    // get the user
    const user = await User.findById(userId)

    // check that the user is an admin
    if (!user.admin) return res.status(401).json({ error: "Unauthorized User" })

    // delete the movie
    const deletedMovie = await Movie.findByIdAndDelete(id)

    res.status(204).json(deletedMovie)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}
