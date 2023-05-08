import express from "express"
import {
  createReview,
  getReview,
  getAllUserReviews,
  getAllMovieReviews,
  toggleLikeReview,
  toggleDislikeReview,
  editReview,
  deleteReview,
} from "../controllers/reviews.js"
import { verifyToken } from "../middleware/auth.js"

const reviewRouter = express.Router()

// create
reviewRouter.get("/:id/create", verifyToken, createReview)

// read
reviewRouter.get("/:id", verifyToken, getReview)
reviewRouter.get("/:id/user", verifyToken, getAllUserReviews)
reviewRouter.get("/:id/movie", verifyToken, getAllMovieReviews)

// update
reviewRouter.patch("/:id/like", verifyToken, toggleLikeReview)
reviewRouter.patch("/:id/like", verifyToken, toggleDislikeReview)
reviewRouter.patch("/:id/edit", verifyToken, editReview)

// delete
reviewRouter.delete("/:id/delete", verifyToken, deleteReview)

export default reviewRouter
