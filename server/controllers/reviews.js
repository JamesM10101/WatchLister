import Movie from "../models/Movie.js"
import Review from "../models/Review.js"
import User from "../models/User.js"

// create
export const createReview = async (req, res) => {
  try {
    // movie id
    const { id } = req.params

    // review data
    const { userId, title, rating, description } = req.body

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
    movie.reviews.push(id)
    await movie.save()

    // return the new review
    res.status(201).json(newReview)
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
    const review = Review.findById(id)

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
    const { userId } = req.body

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
      user.likes.push(updatedReview._id)
    }

    // saved the updated user
    await user.save()

    // return the updated review
    res.status(200).json(updatedReview)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const toggleDislikeReview = async (req, res) => {
  try {
    // review id and user id
    const { id } = req.params
    const { userId } = req.body

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
    if (isLiked) {
      review.likes.delete(userId)
      user.likes.delete(id)
      await user.save()
    }

    // save the updated review
    const result = await review.save()

    // return the updated review
    res.status(200).json(result)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const editReview = async (req, res) => {
  try {
    // review id and post
    const { id } = req.params
    const { title, rating, description } = req.body

    // update review
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        title,
        rating,
        description,
      },
      { new: true }
    )

    // return the updated review
    res.status(200).json(updatedReview)
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
    const { userId } = req.body

    // user and reviewer id
    const user = await User.findById(userId)
    const review = await Review.findById(id)
    const reviewerId = review.userId

    // check that deletion is authorized
    if (reviewerId != userId && !user.admin) {
      return res.status(401).json({
        msg: "Not Authorized",
      })
    }

    // delete the review
    const result = await Review.findByIdAndDelete(id)

    // remove the liked review from all users likes
    User.updateMany(
      { likes: review._id },
      {
        $pull: {
          likes: review._id,
        },
      }
    )

    // return the updated review
    res.status(200).json(result)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}
