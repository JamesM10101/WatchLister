import Movie from "../models/Movie.js"
import Review from "../models/Review.js"
import User from "../models/User.js"

// create
export const createReview = async (req, res) => {
  try {
    // movie id
    const { id } = req.params

    // user id
    const userId = req.header("userId")

    // review data
    const { title, rating, description } = req.body

    // create and save the review
    const formattedReview = new Review({
      movieId: id,
      userId,
      title,
      rating,
      description,
      likes: {},
      dislikes: {},
    })
    const newReview = await formattedReview.save()

    // update the movie with the new review's id
    const movie = await Movie.findById(id)

    // calculate the updated rating
    if (movie.rating) {
      const totalStars = movie.rating * movie.reviews.length
      movie.rating = (
        (totalStars + rating) /
        (movie.reviews.length + 1)
      ).toFixed(2)
    } else {
      movie.rating = rating
    }

    movie.reviews.push(newReview._id)
    await movie.save()

    // update the user with their new review
    const user = await User.findById(userId)
    user.reviews.push(newReview._id)
    const updatedUser = await user.save()
    updatedUser.password = undefined

    // return the new review
    res.status(201).json({ review: newReview, user: updatedUser })
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// read
export const getReview = async (req, res) => {
  try {
    // review id
    const { id } = req.params

    // get the review
    const review = await Review.findById(id)

    // return the review
    res.status(200).json(review)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getAllUserReviews = async (req, res) => {
  try {
    // user id
    const { id } = req.params

    // get the user's reviews
    const reviews = await Review.find({ userId: id })

    // return the reviews
    res.status(200).json(reviews)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const getAllMovieReviews = async (req, res) => {
  try {
    // movie id
    const { id } = req.params

    // get the movie's reviews
    const reviews = await Review.find({ movieId: id })

    // return the reviews
    res.status(200).json(reviews)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// update
export const toggleLikeReview = async (req, res) => {
  try {
    // review id and user id
    const { id } = req.params
    const userId = req.header("userId")

    // review
    const user = await User.findById(userId)
    const review = await Review.findById(id)
    const isLiked = review.likes.get(userId)
    const isDisliked = review.dislikes.get(userId)

    // toggle the like
    if (isLiked) {
      review.likes.delete(userId)
    } else {
      review.likes.set(userId, true)
    }

    // toggle the dislike
    if (isDisliked) {
      review.dislikes.delete(userId)
    }

    // save the updated review
    const updatedReview = await review.save()

    // add the review id to the user's likes
    if (isLiked) {
      user.likes.delete(updatedReview._id)
    } else {
      user.likes.set(updatedReview._id, true)
    }

    // saved the updated user
    const updatedUser = await user.save()
    updatedUser.password = undefined

    // return the updated review
    res.status(200).json({ review: updatedReview, user: updatedUser })
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const toggleDislikeReview = async (req, res) => {
  try {
    // review id and user id
    const { id } = req.params
    const userId = req.header("userId")

    // review
    const user = await User.findById(userId)
    const review = await Review.findById(id)
    const isLiked = review.likes.get(userId)
    const isDisliked = review.dislikes.get(userId)

    // toggle the dislike
    if (isDisliked) {
      review.dislikes.delete(userId)
    } else {
      review.dislikes.set(userId, true)
    }

    // toggle the likes for the review and user
    let updatedUser = user
    if (isLiked) {
      review.likes.delete(userId)
      user.likes.delete(id)

      // save the updates and remove sensitive data
      updatedUser = await user.save()
      updatedUser.password = undefined
    }

    // save the updated review
    const result = await review.save()

    // return the updated review
    res.status(200).json({ review: result, user: updatedUser })
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const editReview = async (req, res) => {
  try {
    // review id and post
    const { id } = req.params
    const userId = req.header("userId")
    const { title, rating, description } = req.body
    const review = await Review.findById(id)
    const reviewerId = review.userId
    const user = await User.findById(userId)
    const movie = await Movie.findById(review.movieId)

    // check that editing is authorized
    if (reviewerId != userId && !user.admin) {
      return res.status(401).json({
        msg: "Not Authorized",
      })
    }

    // update the movie rating
    const totalStars = movie.rating * movie.reviews.length
    const ratingDiff = rating - review.rating
    movie.rating = ((totalStars + ratingDiff) / movie.reviews.length).toFixed(2)
    const updatedMovie = await movie.save()

    // update review
    review.title = title
    review.rating = rating
    review.description = description
    const updatedReview = await review.save()

    // return the updated review
    res.status(200).json({ review: updatedReview, movie: updatedMovie })
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

// delete
export const deleteReview = async (req, res) => {
  try {
    // review id and user id
    const { id } = req.params
    const userId = req.header("userId")

    // user and reviewer id
    const user = await User.findById(userId)
    const review = await Review.findById(id)
    const movie = await Movie.findById(review.movieId)
    const reviewerId = review.userId

    // check that deletion is authorized
    if (reviewerId != userId && !user.admin) {
      return res.status(401).json({
        msg: "Not Authorized",
      })
    }

    // calculate the updated rating
    if (movie.rating) {
      const totalStars = movie.rating * movie.reviews.length
      const divisor = movie.reviews.length - 1
      movie.rating = ((totalStars - review.rating) / (divisor ? divisor : 1)) // don't divide by zero
        .toFixed(2)
    } else {
      movie.rating = 0
    }
    await movie.save()

    // remove the review from the movie
    const updatedMovie = await movie.updateOne(
      {
        $pull: {
          reviews: review._id,
        },
      },
      { new: true }
    )

    // remove the review from the users profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: {
          reviews: review._id,
        },
      },
      { new: true }
    )
    updatedUser.password = undefined

    // remove the liked review from all users likes
    await User.updateMany(
      { ["likes." + review._id]: true },
      {
        $unset: {
          ["likes." + review._id]: "",
        },
      }
    )

    // delete the review
    const result = await Review.findByIdAndDelete(id)

    // return the updated review
    res
      .status(200)
      .json({ review: result, user: updatedUser, movie: updatedMovie })
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}
