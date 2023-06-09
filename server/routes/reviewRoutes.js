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
reviewRouter.post("/:id/create", verifyToken, createReview)

// read
reviewRouter.get("/getReview/:id", getReview)
reviewRouter.get("/:id/user", getAllUserReviews)
reviewRouter.get("/:id/movie", getAllMovieReviews)

// update
reviewRouter.patch("/:id/like", verifyToken, toggleLikeReview)
reviewRouter.patch("/:id/dislike", verifyToken, toggleDislikeReview)
reviewRouter.patch("/:id/edit", verifyToken, editReview)

// delete
reviewRouter.delete("/:id/delete", verifyToken, deleteReview)

export default reviewRouter
