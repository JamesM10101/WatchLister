import Movie from "../models/Movie.js"
import User from "../models/User.js"

// create
export const createMovie = async (req, res) => {
  try {
    // get the user with its id
    const userId = req.header("userId")

    const {
      title,
      shortPlot,
      longPlot,
      posterPath,
      backdropPath,
      releaseDate,
      runtime,
      mpaRating,
      boxOffice,
      imdbId,
      tmdbId,
      trailer,
      genres,
      writers,
      directors,
      actors,
    } = req.body
    const user = await User.findById(userId)

    // check that the user is an admin
    if (!user.admin) return res.status(401).json({ error: "Unauthorized User" })

    // create and save the movie
    const formattedMovie = new Movie({
      title,
      shortPlot,
      longPlot,
      posterPath,
      backdropPath,
      releaseDate,
      runtime,
      mpaRating,
      boxOffice,
      imdbId,
      tmdbId,
      trailer,
      genres,
      writers,
      directors,
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

export const getRandomMovies = async (req, res) => {
  try {
    const queryResult = await Movie.aggregate().sample(10)

    res.status(200).json(queryResult)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getRecentReleases = async (req, res) => {
  try {
    const queryResult = await Movie.aggregate()
      .match({
        releaseDate: {
          $lte: new Date(),
        },
      })
      .sort({ releaseDate: -1 })
      .limit(10)

    res.status(200).json(queryResult)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getHighestRated = async (req, res) => {
  try {
    const queryResult = await Movie.aggregate().sort({ rating: -1 }).limit(10)

    res.status(200).json(queryResult)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getRecentlyAdded = async (req, res) => {
  try {
    const queryResult = await Movie.aggregate().limit(10)

    res.status(200).json(queryResult)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const searchByTitle = async (req, res) => {
  try {
    const { query } = req.params
    const queryResult = await Movie.aggregate()
      .search({
        index: "movie-search",
        text: {
          query: query,
          path: ["title", "genres", "actors", "directors"],
        },
      })
      .limit(30)
      .addFields({
        boxOfficeInt: {
          $cond: {
            if: { $eq: ["$boxOffice", "N/A"] },
            then: 0,
            else: {
              $replaceAll: {
                input: { $substr: ["$boxOffice", 1, -1] },
                find: ",",
                replacement: "",
              },
            },
          },
        },
      })
      .sort({ boxOfficeInt: -1 })

    res.status(200).json(queryResult)
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
      shortPlot,
      longPlot,
      posterPath,
      backdropPath,
      releaseDate,
      runtime,
      mpaRating,
      boxOffice,
      imdbId,
      tmdbId,
      trailer,
      genres,
      writers,
      directors,
      actors,
    } = req.body

    // check user is an admin
    const user = await User.findById(userId)
    if (!user.admin) return res.status(401).json({ error: "Unauthorized User" })

    // update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        shortPlot,
        longPlot,
        posterPath,
        backdropPath,
        releaseDate,
        runtime,
        mpaRating,
        boxOffice,
        imdbId,
        tmdbId,
        trailer,
        genres,
        writers,
        directors,
        actors,
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
