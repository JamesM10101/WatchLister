import Movie from "../models/Movie.js"
import Review from "../models/Review.js"
import User from "../models/User.js"

// read
export const getUser = async (req, res) => {
  try {
    // get the user with its id
    const { id } = req.params
    const user = await User.findById(id)

    // delete user sensitive data
    user.password = undefined
    user.email = undefined
    user.savedMovies = undefined
    user.likes = undefined
    user.admin = undefined

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
    const userId = req.header("userId")
    const user = await User.findById(id)

    // check the user is authroized -- this ID has been comfirmed through verifyToken
    if (userId != user._id && !user.admin) {
      return res.status(403).json({ error: "Unauthorized user" })
    }

    // get the movies
    const savedMovies = await Promise.all(
      user.savedMovies.map(async (id) => await Movie.findById(id))
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
    const userId = req.header("userId")
    const user = await User.findById(id)

    // check the user is authroized -- this ID has been comfirmed through verifyToken
    if (userId != user._id && !user.admin) {
      return res.status(403).json({ error: "Unauthorized user" })
    }

    // get liked reviews
    const likedReviews = await Promise.all(
      user.likes.size
        ? user.likes.map(async (id) => await Review.findById(id))
        : []
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
      user.reviews.map(async (id) => await Review.findById(id))
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
    const userId = req.header("userId")
    const user = await User.findById(id)
    let { username, email } = req.body
    email = email.toLowerCase()

    // check the user is authroized -- this ID has been comfirmed through verifyToken
    if (userId != user._id && !user.admin) {
      return res.status(403).json({ error: "Unauthorized user" })
    }

    // check the email isn't taken
    if (user.email != email) {
      if (await User.find({ email: email })) {
        return res.status(403).json({ error: "Email already in use" })
      }
    }

    // update the user details
    user.username = username
    user.email = email

    // saved the updated user
    const updatedUser = await user.save()

    // return the reviews
    res.status(200).json(updatedUser)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const toggleMovieSaved = async (req, res) => {
  try {
    const { movieId } = req.params
    const userId = req.header("userId")

    let user = await User.findById(userId)
    const index = user.savedMovies.indexOf(`${movieId}`)

    // ensure user is authorized
    if (userId != user._id) {
      return res.status(403).json({ error: "Unauthorized user" })
    }

    // remove movie is not saved, add it otherwise
    if (index >= 0) {
      user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            savedMovies: movieId,
          },
        },
        { new: true }
      )
    } else {
      user.savedMovies.push(movieId)
      await user.save()
    }

    user.password = undefined

    res.status(201).json(user)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}
