import bcrypt from "bcrypt"
import Movie from "../models/Movie.js"
import Review from "../models/Review.js"
import User from "../models/User.js"

// read
export const getUser = async (req, res) => {
  try {
    // get the user with its id
    const { id } = req.params
    const user = await User.findById(id)

    // return the user
    res.status(200).json(user)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getSavedMovies = async (req, res) => {
  try {
    // get the user with its id
    const { id } = req.params
    const user = await User.findById(id)

    // get the movies
    const savedMovies = await Promise.all(
      user.savedMovies.map((id) => Movie.findById(id))
    )

    // format the movies
    const formattedMovies = savedMovies.map(
      ({
        _id,
        title,
        description,
        releaseDate,
        runtime,
        mpaRating,
        director,
        actors,
        reviews,
      }) => {
        return {
          _id,
          title,
          description,
          releaseDate,
          runtime,
          mpaRating,
          director,
          actors,
          reviews,
        }
      }
    )

    // return the movies
    res.status(200).json(formattedMovies)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getLikedReviews = async (req, res) => {
  try {
    // get the user with its id
    const { id } = req.params
    const user = await User.findById(id)

    // get liked reviews
    const likedReviews = await Promise.all(
      user.likes.size ? user.likes.map((id) => Review.findById(id)) : []
    )

    // format the reviews
    const formattedReviews = likedReviews.map(
      ({ _id, movieId, userId, rating, description, likes, dislikes }) => {
        return { _id, movieId, userId, rating, description, likes, dislikes }
      }
    )

    // return the reviews
    res.status(200).json(formattedReviews)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getReviewedMovies = async (req, res) => {
  try {
    // get the user with its id
    const { id } = req.params
    const user = await User.findById(id)

    // get reviews
    const likedReviews = await Promise.all(
      user.reviews.map((id) => Review.findById(id))
    )

    // format the reviews
    const formattedReviews = likedReviews.map(
      ({ _id, movieId, userId, rating, description, likes, dislikes }) => {
        return { _id, movieId, userId, rating, description, likes, dislikes }
      }
    )

    // return the reviews
    res.status(200).json(formattedReviews)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// update
export const updateUser = async (req, res) => {
  try {
    // get the user with its id
    const { id } = req.params
    const { username, email, password, picturePath } = req.body
    const user = await User.findById(id)

    // update the user details
    user.userName = username
    user.email = email
    user.password = await bcrypt.hash(password, 15)
    user.picturePath = picturePath

    // saved the updated user
    const updatedUser = await user.save()

    // return the reviews
    res.status(200).json(updatedUser)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}
